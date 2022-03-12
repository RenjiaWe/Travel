$(document).ready(function () {
  // 獲取小搜尋按鈕
  let searchBtn = document.querySelector('#search-btn')
  // 獲取大的搜索區域
  let searchBar = document.querySelector('.search-bar-container')
  // 獲取登入按鈕
  let formBtn = document.querySelector('#login-btn')
  // 獲取整個登入畫面表單
  let loginForm = document.querySelector('.login-form-container')
  // 獲取登入 X按鈕
  let formClose = document.querySelector('#form-close')
  // 獲取漢堡按鈕
  let menu = document.querySelector('#menu-bar')
  // 獲取導航欄
  let navbar = document.querySelector('.navbar')
  // 獲取控制背景的小圓點
  let videoBtn = document.querySelectorAll('.vid-btn')

  // 有滾動時隱藏
  window.onscroll = () => {
    searchBtn.classList.remove('fa-x')
    searchBar.classList.remove('active')
    navbar.classList.remove('activeNav')
  }

  //點擊小的搜索之後出現大的搜尋框並且將搜索的按鈕換成 X
  searchBtn.addEventListener('click', () => {
    searchBtn.classList.toggle('fa-x')
    searchBar.classList.toggle('active')
  })

  formBtn.addEventListener('click', () => {
    loginForm.classList.add('activeForm')
  })

  formClose.addEventListener('click', () => {
    loginForm.classList.remove('activeForm')
  })

  menu.addEventListener('click', () => {
    navbar.classList.toggle('activeNav')
    menu.classList.add('fa-bars')
  })

  // 影片背景輪播圖
  // 將點擊對應影片的地址值src替換掉正在撥放的那張的地址
  videoBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      // 移除掉全部的.video-active
      document.querySelector('.controls .video-active').classList.remove('video-active')
      // 加入.video-active到點擊的小按鈕
      btn.classList.add('video-active')
      //　獲取點擊到的小圓點並把data-src裡面的地址賦值給 src
      let src = btn.getAttribute('data-src')
      // 將獲取到的data-src裡面的值傳給video-slider裡面的src
      document.querySelector('#video-slider').src = src
    })
  })

  // review輪播圖
  var swiper = new Swiper(".review-slider", {
    // 每個小盒子的間距
    spaceBetween: 20,
    loop: true,
    // 自動撥放
    autoplay: {
      // 播放間格時間(單位毫秒)
      delay: 2500,
      // 設定為true的話用戶手動拖動輪播圖之後,輪播圖將不再繼續執行輪播
      disableOnInteraction: false
    },
    // 各個節點下要顯示的輪播圖數量
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  })

  // brand輪播圖
  var swiper = new Swiper(".brand-slider", {
    // 每個小盒子的間距
    spaceBetween: 20,
    loop: true,
    // 自動撥放
    autoplay: {
      // 播放間格時間(單位毫秒)
      delay: 2500,
      // 設定為true的話用戶手動拖動輪播圖之後,輪播圖將不再繼續執行輪播
      disableOnInteraction: false
    },
    // 各個節點下要顯示的輪播圖數量
    breakpoints: {
      450: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      991: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      }
    }
  });

  // 懶加載
  // 獲取所有img圖片
  const images = document.querySelectorAll('img')
  const callback = entries => {
    entries.forEach(entry => {
      // 如果entry.isIntersecting這個屬性為true,代表進入了圖片可視區域
      if (entry.isIntersecting) {
        // entry.target 等於img
        const image = entry.target
        // 獲取自定義的data-src屬性
        const data_src = image.getAttribute('data-src')
        // 將自訂義的屬性改成瀏覽器看的懂的src屬性
        image.setAttribute('src', data_src)
        // 取消回調函數的觸發(代表圖片都已經加載完成)
        observer.unobserve(image)
      }
    })
  }
  // 創建一個IntersectionObserver的實例
  const observer = new IntersectionObserver(callback)
  // 遍歷每一張圖片,用observer方法來觀察每一個節點
  images.forEach(image => {
    observer.observe(image)
  })

  // 帶有進度條的返回頂部按鈕
  var progressPath = document.querySelector('.progress-wrap path');
  var pathLength = progressPath.getTotalLength();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  progressPath.getBoundingClientRect();
  progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';
  var updateProgress = function () {
    var scroll = $(window).scrollTop();
    var height = $(document).height() - $(window).height();
    var progress = pathLength - (scroll * pathLength / height);
    progressPath.style.strokeDashoffset = progress;
  }
  updateProgress();
  $(window).scroll(updateProgress);
  var offset = 50;
  var duration = 550;
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > offset) {
      $('.progress-wrap').addClass('active-progress');
    } else {
      $('.progress-wrap').removeClass('active-progress');
    }
  });
  $('.progress-wrap').on('click', function (event) {
    event.preventDefault();
    $('html, body').animate({ scrollTop: 0 }, duration);
    return false;
  })
});
