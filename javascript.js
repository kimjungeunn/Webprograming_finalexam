document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar')

  // 스크롤 시 메뉴바 배경색 변경
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled')
    } else {
      navbar.classList.remove('scrolled')
    }
  })

  // 메인 화면의 '요약 보기' 버튼 클릭 시 부드럽게 스크롤
  const startBtn = document.querySelector('.start-btn')

  if (startBtn) {
    startBtn.addEventListener('click', function (e) {
      e.preventDefault()
      const targetId = this.getAttribute('href')
      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth',
        })
      }
    })
  }
})
