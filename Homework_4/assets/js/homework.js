/*
Задания

В вёрстку можно вносить любые изменения (добавлять классы, дата-артрибуты, id и так далее) без изменения внешнего вида. Нельзя изменять другие JS файлы, подключаемые к HTML

    1.  На первом экране вы видите 3 блока с class="features-content". Они внутри себя содержат <div class="content-hide" ></div>, который
        содержит необходимую информацию. При наведении курсора на div с class="features-content" сделайте так, чтобы <div class="content-hide" ></div>
        показывался, а когда уводили курор, то блок с class="features-content" становился предыдущих размеров. 

        P.S. Нормально, если при наведении на див с class="features-content" он становится оранжевым - это можно не фиксить

    2.  На втором экране вы видите табы:
        а) Best Education
        б) Top Managemen
        в) Quality Meeting
        При нажатии на каждый из этих табов (квадратик или название) сайтик должен показывать соответствующий блок информации
        с нужной фотографией, описанием и заголовком.

        P.S. Сейчас показаны все блоки с описанием

    3. На третьем экране есть отсчёт обратного времени. Сделайте так, чтобы обратный отсчёт был в режиме реального времени (посекундно).
    В качестве дедлайна (крайней даты) возьмите 31.12.2023

    P.S. Подсказка - в 22_js уроке в проекте Food разбирается, как работать со счётчиком

    4.  На 4-ом экране есть 5 карточек, заполненные информацией. Сделайте так, чтобы верстка подтягивалась и вставлялась в HTML документа
        из JS, а именно из массива coursesMass. Это значит, в самом HTML не должно быть верстки (вам нужно будет удалить),
        и она должна вставляться только через JS

*/





// Задание 1

// Получаем все элементы с классом 'features-content' и сохраняем их в переменной featureContent
const featureContent = document.querySelectorAll('.features-content');

// Получаем все элементы с классом 'content-hide' и сохраняем их в переменной contentHide
let contentHide = document.querySelectorAll('.content-hide');

// Объявляем функцию handleMouseover, которая устанавливает стиль 'display: block' для элемента с соответствующим индексом
function handleMouseover(index) {
    contentHide[index].style.display = 'block';
}

// Объявляем функцию handleMouseout, которая устанавливает стиль 'display: none' для элемента с соответствующим индексом
function handleMouseout(index) {
    contentHide[index].style.display = 'none';
}

// Итерируем по всем элементам featureContent с использованием forEach
featureContent.forEach(function (featureBlock, index) {
    // Добавляем обработчик события 'mouseover', вызывающий handleMouseover с передачей текущего индекса
    featureBlock.addEventListener('mouseover', function () {
        handleMouseover(index);
    });

    // Добавляем обработчик события 'mouseout', вызывающий handleMouseout с передачей текущего индекса
    featureBlock.addEventListener('mouseout', function () {
        handleMouseout(index);
    });
});





// Задание 2
 
// Функция showTab устанавливает видимость соответствующего контента вкладки в зависимости от переданного индекса.
function showTab(index) {
  tabsContent.forEach(function(tabContent, contentIndex) {
    tabContent.style.display = contentIndex === index ? 'block' : 'none';
  });
}

// Функция setActiveTab устанавливает активный класс для выбранной вкладки в меню и удаляет его у предыдущей активной вкладки.
function setActiveTab(link) {
  const activeTab = document.querySelector('.ui-tabs-active a');
  activeTab.parentNode.classList.remove('ui-tabs-active');
  link.parentNode.classList.add('ui-tabs-active');
}

// Получаем все элементы меню и контент вкладок.
const tabsMenu = document.querySelectorAll('.tabs-menu a');
const tabsContent = document.querySelectorAll('.tabs-content article');

// Показываем первый контент вкладки и устанавливаем активный класс для соответствующей вкладки в меню.
tabsContent[0].style.display = 'block';
document.querySelector('.tabs-menu .ui-tabs-active a').parentNode.classList.add('ui-tabs-active');

// Добавляем обработчик события click для каждой вкладки в меню.
tabsMenu.forEach(function(tabMenuLink, index) {
  tabMenuLink.addEventListener('click', function(event) {
    event.preventDefault();
    // Вызываем функцию showTab для отображения соответствующего контента.
    showTab(index);
    // Вызываем функцию setActiveTab для установки активной вкладки в меню.
    setActiveTab(this);
  });
});





// Задание 3

// Получаем текущий год
const currentYear = new Date().getFullYear();

// Устанавливаем целевую дату на 31 декабря текущего года в 00:01 по московскому времени (UTC+3), поэтому установлена дата 30.12.23 21:01
const targetDate = new Date(Date.UTC(currentYear, 11, 30, 21, 1));

// Сохраняем ссылки на HTML-элементы для отображения обратного отсчета
const countdownElements = {
    days: document.querySelector('.days .value'),
    hours: document.querySelector('.hours .value'),
    minutes: document.querySelector('.minutes .value'),
    seconds: document.querySelector('.seconds .value'),
}

// Функция обновления отображения обратного отсчета
const updateCountdown = () => {
  // Получаем текущую дату
  const currentDate = new Date();

  // Вычисляем разницу во времени между текущей датой и целевой датой
  const timeDiff = targetDate.getTime() - currentDate.getTime();

  // Проверяем, что разница положительна (целевая дата еще не наступила)
  if (timeDiff > 0) {
      // Функция для вычисления значений дней, часов, минут и секунд
      const calculateTime = (unit) => {
          const divisor = unit === 'days' ? (1000 * 60 * 60 * 24) : (unit === 'hours' ? (1000 * 60 * 60) : (unit === 'minutes' ? (1000 * 60) : 1000));
          const value = Math.floor(timeDiff / divisor) % (unit === 'days' ? 365 : (unit === 'hours' ? 24 : 60));
          return value < 10 ? '0' + value : value;
      };

      // Обновляем текстовое содержимое HTML-элементов для отображения обратного отсчета
      Object.keys(countdownElements).forEach((unit) => {
          countdownElements[unit].textContent = calculateTime(unit);
      });
  } else {
      // Если целевая дата уже наступила, устанавливаем нулевые значения
      Object.values(countdownElements).forEach((element) => {
          element.textContent = '00';
      });
  }
};

setInterval(updateCountdown, 1000);





// Задание 4
const coursesMass = [
  {
    cardImg: {
      src: 'assets/images/courses-01.jpg',
      alt: 'Course #1',
    },
    header: 'Digital Marketing',
    descr:
      'You can get free images and videos for your websites by visiting Unsplash, Pixabay, and Pexels.',
    authorImg: {
      src: 'assets/images/author-01.png',
      alt: 'Author #1',
    },
  },
  {
    cardImg: {
      src: 'assets/images/courses-02.jpg',
      alt: 'Course #2',
    },
    header: 'Business World',
    descr:
      'Quisque cursus augue ut velit dictum, quis volutpat enim blandit. Maecenas a lectus ac ipsum porta.',
    authorImg: {
      src: 'assets/images/author-02.png',
      alt: 'Author #2',
    },
  },
  {
    cardImg: {
      src: 'assets/images/courses-03.jpg',
      alt: 'Course #3',
    },
    header: 'Media Technology',
    descr:
      'Pellentesque ultricies diam magna, auctor cursus lectus pretium nec.',
    authorImg: {
      src: 'assets/images/author-03.png',
      alt: 'Author #3',
    },
  },
  {
    cardImg: {
      src: 'assets/images/courses-04.jpg',
      alt: 'Course #4',
    },
    header: 'Communications',
    descr:
      'Download free images and videos for your websites by visiting Unsplash, Pixabay, and Pexels.',
    authorImg: {
      src: 'assets/images/author-04.png',
      alt: 'Author #4',
    },
  },
  {
    cardImg: {
      src: 'assets/images/courses-05.jpg',
      alt: 'Course #5',
    },
    header: 'Business Ethics',
    descr:
      'Pellentesque ultricies diam magna, auctor cursus lectus pretium nec. Maecenas finibus lobortis enim.',
    authorImg: {
      src: 'assets/images/author-05.png',
      alt: 'Author #5',
    },
  },
]

function formatCourses(courses) {
  return courses.map((course) => {
    return `
      <div class="carousel__item">
        <img src="${course.cardImg.src}" alt="${course.cardImg.alt}">
        <div class="carousel__content">
          <h4>${course.header}</h4>
          <p>${course.descr}</p>
          <div class="item__last-row">
            <img src="${course.authorImg.src}" alt="${course.authorImg.alt}">
            <div class="text-button-pay">
              <a href="#">Pay <i class="fa fa-angle-double-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function insertAdjacentHTML(selector, position, html) {
  const targetElement = document.querySelector(selector);
  targetElement.insertAdjacentHTML(position, html);
}

function insertCourses() {
  const formattedCourses = formatCourses(coursesMass);
  const targetSelector = '.carousel__wrapper'; 
  insertAdjacentHTML(targetSelector, 'afterbegin', formattedCourses); 
}

document.addEventListener('DOMContentLoaded', insertCourses);