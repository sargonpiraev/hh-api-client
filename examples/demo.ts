import { HeadHunterClient } from '../src/index.js';

// Демонстрация работы HeadHunter API клиента
async function demo() {
  console.log('🚀 HeadHunter API Client Demo');
  console.log('=============================\n');

  // Создаем экземпляр клиента
  const client = new HeadHunterClient({
    userAgent: 'HeadHunter-API-Client-Demo/1.0.0 (demo@example.com)',
    timeout: 5000,
  });

  console.log('✅ Клиент создан с конфигурацией:');
  console.log('   - User-Agent: HeadHunter-API-Client-Demo/1.0.0');
  console.log('   - Timeout: 5000ms');
  console.log('   - Base URL: https://api.hh.ru\n');

  console.log('📋 Доступные методы клиента:');
  console.log('   - getAreas() - получить регионы');
  console.log('   - getArea(id) - получить конкретный регион');
  console.log('   - getProfessionalRoles() - получить профессиональные роли');
  console.log('   - getLanguages() - получить языки');
  console.log('   - getIndustries() - получить отрасли');
  console.log('   - getSkills() - получить ключевые навыки');
  console.log('   - getEducationalInstitutions() - получить учебные заведения');
  console.log('   - getDictionaries() - получить все справочники');
  console.log('   - getMetroStations(cityId) - получить станции метро');
  console.log('   - и другие...\n');

  console.log('💡 Пример использования:');
  console.log(`
  const client = new HeadHunterClient();
  
  // Получение списка регионов
  const areas = await client.getAreas();
  console.log('Количество регионов:', areas.length);
  
  // Получение информации о Москве
  const moscow = await client.getArea('1');
  console.log('Регион:', moscow.name);
  
  // Получение профессиональных ролей
  const roles = await client.getProfessionalRoles();
  console.log('Количество ролей:', roles.length);
  `);

  console.log('🔗 Основные эндпоинты HeadHunter API:');
  console.log('   - /areas - регионы');
  console.log('   - /professional_roles - профессиональные роли');
  console.log('   - /languages - языки');
  console.log('   - /industries - отрасли');
  console.log('   - /skills - ключевые навыки');
  console.log('   - /dictionaries - справочники');
  console.log('   - /metro/{city_id} - станции метро');
  console.log('   - /educational_institutions - учебные заведения\n');

  console.log('✨ Клиент готов к использованию!');
  console.log('   Раскомментируйте код ниже для тестирования с реальным API\n');

  // Раскомментируйте для тестирования с реальным API:
  /*
  try {
    console.log('🔄 Тестируем реальные запросы к API...\n');
    
    // Проверяем статус API
    const status = await client.getApiStatus();
    console.log('✅ API статус:', status);
    
    // Получаем несколько регионов
    const areas = await client.getAreas();
    console.log(`✅ Получено регионов: ${areas.length}`);
    
    // Получаем информацию о Москве
    const moscow = await client.getArea('1');
    console.log(`✅ Москва: ${moscow.name} (ID: ${moscow.id})`);
    
    console.log('\n🎉 Все запросы выполнены успешно!');
  } catch (error) {
    console.error('❌ Ошибка при работе с API:', error.message);
  }
  */
}

// Запуск демонстрации
if (import.meta.url === `file://${process.argv[1]}`) {
  demo().catch(console.error);
}

export { demo };