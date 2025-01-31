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

window.showServiceDetail = function (service) {
  if (!modal) return;

  // 서비스 섹션의 위치 찾기
  const servicesSection = document.getElementById("services");
  if (servicesSection) {
    // 서비스 섹션이 화면 상단에 오도록 스크롤
    const offset = servicesSection.offsetTop - 100; // 상단에 약간의 여백을 둠
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  }

  modal.style.display = "flex";

  // 모달 애니메이션 효과 추가
  modal.style.opacity = "0";
  modal.style.transform = "scale(0.95)";

  setTimeout(() => {
    modal.style.opacity = "1";
    modal.style.transform = "scale(1)";
  }, 50);

  document.querySelectorAll(".service-detail").forEach((detail) => {
    detail.style.display = "none";
  });
  document.getElementById(`${service}Detail`).style.display = "block";

  // 모달 내용을 처음부터 보이게 스크롤 초기화
  modal.querySelector(".modal-content").scrollTop = 0;

  // 페이지 스크롤 방지
  document.body.style.overflow = "hidden";
};

if (closeButton && modal) {
  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // 스크롤 다시 활성화
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto"; // 스크롤 다시 활성화
    }
  });
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
  doctorCards.forEach((card) => card.classList.remove("active"));
  doctorCards[index].classList.add("active");
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
