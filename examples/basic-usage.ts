import { HeadHunterClient } from '../src/index.js';

// Пример базового использования HeadHunter API клиента
async function exampleUsage() {
  // Создаем экземпляр клиента
  const client = new HeadHunterClient({
    userAgent: 'MyApp/1.0.0 (your-email@example.com)',
  });

  try {
    console.log('=== HeadHunter API Client Example ===\n');

    // Получение статуса API
    console.log('1. Проверяем статус API...');
    const status = await client.getApiStatus();
    console.log('API Status:', status);

    // Получение регионов
    console.log('\n2. Получаем список регионов...');
    const areas = await client.getAreas();
    console.log(`Найдено регионов: ${areas.length}`);
    console.log('Первые 3 региона:', areas.slice(0, 3));

    // Получение конкретного региона (Москва)
    console.log('\n3. Получаем информацию о Москве...');
    const moscow = await client.getArea('1');
    console.log('Москва:', moscow);

    // Получение профессиональных ролей
    console.log('\n4. Получаем профессиональные роли...');
    const roles = await client.getProfessionalRoles();
    console.log(`Найдено ролей: ${roles.length}`);
    console.log('Первые 5 ролей:', roles.slice(0, 5));

    // Получение языков
    console.log('\n5. Получаем список языков...');
    const languages = await client.getLanguages();
    console.log(`Найдено языков: ${languages.length}`);
    console.log('Первые 5 языков:', languages.slice(0, 5));

    // Получение отраслей
    console.log('\n6. Получаем список отраслей...');
    const industries = await client.getIndustries();
    console.log(`Найдено отраслей: ${industries.length}`);
    console.log('Первые 3 отрасли:', industries.slice(0, 3));

    // Получение ключевых навыков
    console.log('\n7. Получаем ключевые навыки...');
    const skills = await client.getSkills();
    console.log(`Найдено навыков: ${skills.length}`);
    console.log('Первые 5 навыков:', skills.slice(0, 5));

    // Получение справочников
    console.log('\n8. Получаем справочники...');
    const dictionaries = await client.getDictionaries();
    console.log('Доступные справочники:', Object.keys(dictionaries));

    // Получение типов занятости
    console.log('\n9. Получаем типы занятости...');
    const employmentTypes = await client.getEmploymentTypes();
    console.log('Типы занятости:', employmentTypes);

    // Получение графиков работы
    console.log('\n10. Получаем графики работы...');
    const schedules = await client.getScheduleTypes();
    console.log('Графики работы:', schedules);

    // Получение станций метро в Москве
    console.log('\n11. Получаем станции метро в Москве...');
    const metroStations = await client.getMetroStations('1');
    console.log(`Найдено станций метро: ${metroStations.length}`);
    if (metroStations.length > 0) {
      console.log('Первые 3 станции:', metroStations.slice(0, 3));
    }

    // Поиск учебных заведений в Москве
    console.log('\n12. Ищем учебные заведения в Москве...');
    const institutions = await client.getEducationalInstitutions('1');
    console.log(`Найдено учебных заведений: ${institutions.length}`);
    if (institutions.length > 0) {
      console.log('Первые 3 учебных заведения:', institutions.slice(0, 3));
    }

  } catch (error) {
    console.error('Ошибка при работе с API:', error);
  }
}

// Запуск примера
if (import.meta.url === `file://${process.argv[1]}`) {
  exampleUsage().catch(console.error);
}

export { exampleUsage };