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

document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------
  // 방명록 (Guestbook) 기능 (LocalStorage 활용)
  // -----------------------------------------
  const gbForm = document.getElementById('gb-form')
  const gbList = document.getElementById('gb-list')

  // 1. 브라우저 저장소에서 기존 방명록 데이터 불러오기
  const loadMessages = () => {
    // 저장된 데이터가 없으면 빈 배열([])을 가져옴
    const messages = JSON.parse(localStorage.getItem('guestbookData')) || []

    // 화면 초기화 후 데이터 뿌려주기
    gbList.innerHTML = ''
    messages.forEach((msg) => {
      const div = document.createElement('div')
      div.className = 'gb-entry'
      div.innerHTML = `
                <strong>${msg.name}</strong>
                <p>${msg.text}</p>
                <span class="date">${msg.date}</span>
            `
      gbList.appendChild(div)
    })
  }

  // 현재 페이지에 방명록 폼이 있을 때만 실행
  if (gbForm) {
    loadMessages() // 페이지 로딩 시 기존 글 띄우기

    // 2. 폼 제출 버튼을 눌렀을 때 실행되는 이벤트
    gbForm.addEventListener('submit', (e) => {
      e.preventDefault() // 기본 새로고침 방지 (AJAX처럼 부드럽게 처리하기 위함)

      const nameInput = document.getElementById('gb-name')
      const textInput = document.getElementById('gb-text')

      // 내용이 비어있으면 저장 안 함
      if (nameInput.value.trim() === '' || textInput.value.trim() === '') return

      // 새로운 방명록 데이터 객체 만들기
      const newMessage = {
        name: nameInput.value,
        text: textInput.value,
        // 현재 날짜와 시간 가져오기
        date: new Date().toLocaleString('ko-KR'),
      }

      // 기존 데이터 배열을 불러와서 새 글을 맨 앞에 추가(unshift)
      const messages = JSON.parse(localStorage.getItem('guestbookData')) || []
      messages.unshift(newMessage)

      // 브라우저 저장소에 다시 문자열로 바꿔서 저장
      localStorage.setItem('guestbookData', JSON.stringify(messages))

      // 입력칸 비워주기
      nameInput.value = ''
      textInput.value = ''

      // 알림 띄우고 목록 다시 그리기
      alert('방명록이 등록되었습니다!')
      loadMessages()
    })
  }
})
document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------
  // 중간과제 이미지 팝업 기능
  // -----------------------------------------
  const midtermTitle = document.getElementById('midterm-title')
  const imageModal = document.getElementById('image-modal')
  const closeBtn = document.querySelector('.close-btn')

  // 제목이 존재하는 페이지(Project)에서만 실행
  if (midtermTitle && imageModal) {
    // 1. 제목 클릭 시 이벤트
    midtermTitle.addEventListener('click', () => {
      // 알림창 먼저 띄우기
      alert('중간과제입니다!')
      // 확인 누르면 사진 모달창 보이기
      imageModal.style.display = 'block'
    })

    // 2. 우측 상단 X 버튼 누르면 닫기
    closeBtn.addEventListener('click', () => {
      imageModal.style.display = 'none'
    })

    // 3. 사진 바깥쪽 검은 배경을 클릭해도 닫히게 만들기
    window.addEventListener('click', (e) => {
      if (e.target === imageModal) {
        imageModal.style.display = 'none'
      }
    })
  }
})

document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------
  // 기말과제 이미지 팝업 기능
  // -----------------------------------------
  const finalTitle = document.getElementById('final-title')
  const finalImageModal = document.getElementById('final-image-modal')
  const finalCloseBtn = document.getElementById('final-close-btn')

  // 제목이 존재하는 페이지(Project)에서만 실행
  if (finalTitle && finalImageModal) {
    // 1. 제목 클릭 시 이벤트
    finalTitle.addEventListener('click', () => {
      // 알림창 먼저 띄우기
      alert('기말과제입니다!')
      // 확인 누르면 사진 모달창 보이기
      finalImageModal.style.display = 'block'
    })

    // 2. 우측 상단 X 버튼 누르면 닫기
    if (finalCloseBtn) {
      finalCloseBtn.addEventListener('click', () => {
        finalImageModal.style.display = 'none'
      })
    }

    // 3. 사진 바깥쪽 검은 배경을 클릭해도 닫히게 만들기
    window.addEventListener('click', (e) => {
      if (e.target === finalImageModal) {
        finalImageModal.style.display = 'none'
      }
    })
  }
})
