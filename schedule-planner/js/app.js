/**
 * Основной модуль приложения
 * Координирует работу всех компонентов планировщика расписания
 */

const App = (() => {
    /**
     * Инициализировать приложение
     */
    const init = () => {
        loadAndDisplayEvents();

        UI.initEventListeners({
            onAddEvent: handleAddEvent,
            onEditEvent: handleEditEvent,
            onFilterChange: handleFilterChange
        });

        UI.setDeleteHandler(handleDeleteEvent);
        UI.setToggleCompleteHandler(handleToggleComplete);

        console.log('✅ Планировщик расписания инициализирован');
    };

    /**
     * Загрузить события из хранилища и отобразить их
     */
    const loadAndDisplayEvents = () => {
        const events = Storage.getEvents();
        const filterValues = UI.getFilterValues();
        const processedEvents = EventManager.getProcessedEvents(events, filterValues);
        UI.displayEvents(processedEvents);
    };

    /**
     * Обработчик добавления нового события
     * @param {Object} eventData - Данные нового события
     */
    const handleAddEvent = (eventData) => {
        const newEvent = Storage.addEvent(eventData);
        console.log('✅ Событие добавлено:', newEvent);
        
        loadAndDisplayEvents();
        
        showNotification('Событие успешно добавлено!', 'success');
    };

    /**
     * Обработчик редактирования события
     * @param {number} id - ID события
     * @param {Object} eventData - Обновленные данные события
     */
    const handleEditEvent = (id, eventData) => {
        const success = Storage.updateEvent(id, eventData);
        
        if (success) {
            console.log('✅ Событие обновлено (ID:', id + ')');
            loadAndDisplayEvents();
            showNotification('Событие успешно обновлено!', 'success');
        } else {
            console.error('❌ Ошибка: событие не найдено (ID:', id + ')');
            UI.showError('Ошибка при обновлении события');
        }
    };

    /**
     * Обработчик удаления события
     * @param {number} id - ID события
     */
    const handleDeleteEvent = (id) => {
        if (confirm('Вы уверены, что хотите удалить это событие?')) {
            const success = Storage.deleteEvent(id);
            
            if (success) {
                console.log('✅ Событие удалено (ID:', id + ')');
                loadAndDisplayEvents();
                showNotification('Событие удалено', 'info');
            } else {
                console.error('❌ Ошибка: событие не найдено (ID:', id + ')');
                UI.showError('Ошибка при удалении события');
            }
        }
    };

    /**
     * Обработчик переключения статуса завершенности события
     * @param {number} id - ID события
     */
    const handleToggleComplete = (id) => {
        const event = Storage.getEventById(id);
        
        if (event) {
            const newCompleted = !event.completed;
            Storage.updateEvent(id, { completed: newCompleted });
            console.log(`✅ Статус события изменен на "${newCompleted ? 'завершено' : 'активно'}" (ID:`, id + ')', );
            loadAndDisplayEvents();
            
            const message = newCompleted ? 'Событие отмечено как завершенное' : 'Событие отмечено как активное';
            showNotification(message, 'info');
        } else {
            console.error('❌ Ошибка: событие не найдено (ID:', id + ')');
            UI.showError('Ошибка при изменении статуса события');
        }
    };

    /**
     * Обработчик изменения фильтров
     */
    const handleFilterChange = () => {
        loadAndDisplayEvents();
    };

    /**
     * Показать уведомление пользователю
     * @param {string} message - Текст уведомления
     * @param {string} type - Тип уведомления ('success', 'error', 'info')
     */
    const showNotification = (message, type = 'info') => {
        console.log(`[${type.toUpperCase()}] ${message}`);
    };

    return {
        init
    };
})();

// Инициализировать приложение когда DOM полностью загружен
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
