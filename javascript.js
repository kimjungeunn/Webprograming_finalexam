document.addEventListener('DOMContentLoaded', () => {
  // 1. 다크모드 기능
  const header = document.querySelector('.header-container')
  const toggleBtn = document.createElement('button')
  toggleBtn.style.cssText =
    'padding: 8px 12px; cursor: pointer; border-radius: 5px; border: none; font-weight: bold; background: #f39c12; color: white; transition: 0.3s;'
  header.appendChild(toggleBtn)

  let isDark = localStorage.getItem('darkMode') === 'true'
  const applyMode = () => {
    document.body.style.backgroundColor = isDark ? '#1a1a1a' : '#fff'
    document.body.style.color = isDark ? '#f1f1f1' : '#333'
    toggleBtn.textContent = isDark ? '☀️ 라이트모드' : '🌙 다크모드'
  }
  applyMode()

  toggleBtn.addEventListener('click', () => {
    isDark = !isDark
    localStorage.setItem('darkMode', isDark)
    applyMode()
  })

  // 2. 스크롤 애니메이션 (카드가 부드럽게 등장)
  const cards = document.querySelectorAll('.profile-card, .project-item')
  cards.forEach((card) => {
    card.style.opacity = '0'
    card.style.transform = 'translateY(30px)'
  })

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
        observer.unobserve(entry.target)
      }
    })
  })
  cards.forEach((card) => observer.observe(card))

  // 3. 이미지 슬라이더 (캐러셀) 기능
  const track = document.querySelector('.slider-track')
  const images = document.querySelectorAll('.slider-track img')
  const prevBtn = document.querySelector('.prev-btn')
  const nextBtn = document.querySelector('.next-btn')

  let slideIndex = 0

  // 슬라이드 이동 함수
  const moveSlide = () => {
    track.style.transform = `translateX(-${slideIndex * 100}%)`
  }

  // 다음 버튼 클릭
  nextBtn.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % images.length
    moveSlide()
  })

  // 이전 버튼 클릭
  prevBtn.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + images.length) % images.length
    moveSlide()
  })

  // 3초마다 자동으로 넘어가기
  setInterval(() => {
    slideIndex = (slideIndex + 1) % images.length
    moveSlide()
  }, 5000)
})
