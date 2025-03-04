// AOS 초기화
AOS.init({
  duration: 1000,
  once: true,
});

// 스크롤 이벤트 처리
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.9)";
  }
});

// 예약 버튼 클릭 이벤트 (메인 페이지에만 있는 요소)
const ctaButton = document.querySelector(".cta-button");
if (ctaButton) {
  ctaButton.addEventListener("click", function () {
    window.location.href = "reservation.html";
  });
}

// 예약 폼 제출 처리 (예약 페이지에만 있는 요소)
const reservationForm = document.querySelector(".reservation-form");
if (reservationForm) {
  reservationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // 폼 데이터 수집
    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      date: document.getElementById("date").value,
      message: document.getElementById("message").value,
    };

    // 여기에 실제 예약 처리 로직 추가 (서버 전송 등)
    alert("예약이 접수되었습니다. 확인 후 연락드리겠습니다.");
    this.reset();
  });
}

// 전화번호 형식 자동 변환
const phoneInput = document.getElementById("phone");
if (phoneInput) {
  phoneInput.addEventListener("input", function (e) {
    let number = e.target.value.replace(/[^0-9]/g, "");
    if (number.length > 3 && number.length <= 7) {
      number = number.slice(0, 3) + "-" + number.slice(3);
    } else if (number.length > 7) {
      number =
        number.slice(0, 3) +
        "-" +
        number.slice(3, 7) +
        "-" +
        number.slice(7, 11);
    }
    e.target.value = number;
  });
}

// 진료분야 상세 모달 관련 기능
const modal = document.getElementById("serviceModal");
const closeButton = modal ? document.querySelector(".close-button") : null;

function showServiceDetail(service) {
  const modal = document.getElementById('serviceModal');
  const details = document.querySelectorAll('.service-detail');
  
  // 모든 상세 내용 숨기기
  details.forEach(detail => detail.style.display = 'none');
  
  // 선택된 서비스 상세 내용 표시
  document.getElementById(service + 'Detail').style.display = 'block';
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

// 모달 닫기 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('serviceModal');
  const closeBtn = document.querySelector('.close-button');

  // X 버튼 클릭시 닫기
  closeBtn.addEventListener('click', closeModal);

  // 모달 외부 클릭시 닫기
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ESC 키 누를때 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

// 모달 닫기 함수
function closeModal() {
  const modal = document.getElementById('serviceModal');
  modal.style.display = 'none';
  document.body.style.overflow = ''; // 배경 스크롤 복원
}

// 햄버거 메뉴 기능
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const menuItems = document.querySelectorAll(".nav-links li");
  const body = document.body;

  console.log("Script loaded");
  console.log("Hamburger:", hamburger);
  console.log("NavLinks:", navLinks);

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      console.log("Hamburger clicked");
      this.classList.toggle("active");
      navLinks.classList.toggle("active");

      if (navLinks.classList.contains("active")) {
        body.style.overflow = "hidden";
        menuItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, index * 100);
        });
      } else {
        body.style.overflow = "auto";
        menuItems.forEach((item) => {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
        });
      }
    });
  }

  // 메뉴 항목 클릭시 메뉴 닫기
  menuItems.forEach((item) => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      body.style.overflow = "auto";
      menuItems.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
      });
    });
  });

  // 화면 크기 변경 감지
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      // PC 크기일 때
      navLinks.style.display = "flex";
      menuItems.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      });
      body.style.overflow = "auto";
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
    } else {
      // 모바일 크기일 때
      if (!navLinks.classList.contains("active")) {
        navLinks.style.removeProperty("display");
      }
    }
  });
});

// 의사 카드 슬라이드 기능
let currentDoctorIndex = 0;
const doctorCards = document.querySelectorAll(".doctor-card");

function showDoctor(index) {
  const currentCard = document.querySelector(".doctor-card.active");
  const indicators = document.querySelectorAll(".slide-indicator");
  const nextCard = doctorCards[index];
  const direction = index > currentDoctorIndex ? 1 : -1;

  // 인디케이터 업데이트
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === index);
  });

  if (currentCard) {
    currentCard.style.transform = `translateX(${-100 * direction}%)`;
    currentCard.style.opacity = "0";

    nextCard.style.display = "block";
    nextCard.style.transform = `translateX(${100 * direction}%)`;

    setTimeout(() => {
      currentCard.classList.remove("active");
      nextCard.classList.add("active");
      nextCard.style.opacity = "1";
      nextCard.style.transform = "translateX(0)";
    }, 50);
  }

  currentDoctorIndex = index;
}

function nextDoctor() {
  currentDoctorIndex = (currentDoctorIndex + 1) % doctorCards.length;
  showDoctor(currentDoctorIndex);
}

function prevDoctor() {
  currentDoctorIndex =
    (currentDoctorIndex - 1 + doctorCards.length) % doctorCards.length;
  showDoctor(currentDoctorIndex);
}

// 터치/스와이프 기능 추가
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;

document
  .querySelector(".doctors-grid")
  .addEventListener("mousedown", dragStart);
document
  .querySelector(".doctors-grid")
  .addEventListener("touchstart", dragStart);
document.querySelector(".doctors-grid").addEventListener("mousemove", drag);
document.querySelector(".doctors-grid").addEventListener("touchmove", drag);
document.querySelector(".doctors-grid").addEventListener("mouseup", dragEnd);
document.querySelector(".doctors-grid").addEventListener("touchend", dragEnd);

function dragStart(e) {
  isDragging = true;
  startPos = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
}

function drag(e) {
  if (!isDragging) return;
  const currentPosition =
    e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
  const diff = currentPosition - startPos;

  if (Math.abs(diff) > 50) {
    isDragging = false;
    if (diff > 0) {
      prevDoctor();
    } else {
      nextDoctor();
    }
  }
}

function dragEnd() {
  isDragging = false;
}
