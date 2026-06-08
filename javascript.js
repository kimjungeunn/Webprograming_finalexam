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
    messages.forEach((msg, index) => {
      // 구버전 방명록 데이터 호환을 위해 id가 없으면 임시 부여
      if (!msg.id) msg.id = Date.now() + index

      const div = document.createElement('div')
      div.className = 'gb-entry'
      div.innerHTML = `
                <strong>${msg.name}</strong>
                <button class="gb-delete-btn" data-id="${msg.id}">삭제</button>
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
      const passwordInput = document.getElementById('gb-password')
      const textInput = document.getElementById('gb-text')

      // 내용이 비어있으면 저장 안 함
      if (
        nameInput.value.trim() === '' ||
        passwordInput.value.trim() === '' ||
        textInput.value.trim() === ''
      )
        return

      // 새로운 방명록 데이터 객체 만들기
      const newMessage = {
        id: Date.now(), // 고유 ID 부여
        name: nameInput.value,
        password: passwordInput.value, // 비밀번호 저장
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
      passwordInput.value = ''
      textInput.value = ''

      // 알림 띄우고 목록 다시 그리기
      alert('방명록이 등록되었습니다!')
      loadMessages()
    })

    // 3. 삭제 버튼 클릭 이벤트
    gbList.addEventListener('click', (e) => {
      if (e.target.classList.contains('gb-delete-btn')) {
        const idToDelete = e.target.getAttribute('data-id')
        let messages = JSON.parse(localStorage.getItem('guestbookData')) || []

        // 삭제할 방명록 인덱스 찾기
        const msgIndex = messages.findIndex(
          (m) => m.id && m.id.toString() === idToDelete,
        )

        if (msgIndex > -1) {
          const inputPw = prompt('비밀번호를 입력하세요:')
          if (inputPw === null) return // 취소 버튼 누른 경우

          // 기존 비밀번호가 없는 데이터(구버전)이거나 비밀번호가 일치하는 경우 삭제 허용
          if (
            !messages[msgIndex].password ||
            messages[msgIndex].password === inputPw
          ) {
            messages.splice(msgIndex, 1) // 배열에서 해당 요소 삭제
            localStorage.setItem('guestbookData', JSON.stringify(messages)) // 변경된 배열 다시 저장
            alert('방명록이 삭제되었습니다.')
            loadMessages() // 화면 새로고침
          } else {
            alert('비밀번호가 일치하지 않습니다.')
          }
        }
      }
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

document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------
  // 프로젝트 언어별 필터링 기능
  // -----------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn')
  const projectCards = document.querySelectorAll('.project-grid-2 .card')

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // 모든 버튼에서 active 클래스 제거하고 클릭된 버튼에만 추가
      filterBtns.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')

      const filterValue = btn.getAttribute('data-filter')

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category')
        // 전체를 선택했거나 카테고리가 일치하면 보이게, 아니면 숨김
        if (filterValue === 'all' || filterValue === category) {
          card.style.display = 'flex'
        } else {
          card.style.display = 'none'
        }
      })
    })
  })
})

document.addEventListener('DOMContentLoaded', () => {
  // -----------------------------------------
  // 다크모드 (Light / Dark Mode) 토글 기능
  // -----------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle')

  if (themeToggleBtn) {
    // 1. 브라우저 저장소(로컬 스토리지)에서 이전 테마 설정 불러오기
    const currentTheme = localStorage.getItem('theme')

    // 이전에 다크모드로 설정했었다면 렌더링 시점에 바로 다크모드 적용
    if (currentTheme === 'dark') {
      document.body.classList.add('dark-mode')
      themeToggleBtn.innerHTML = '<img src="sun.png" alt="라이트모드">'
    }

    // 2. 버튼 클릭 시 테마 전환
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode')

      let theme = 'light'
      if (document.body.classList.contains('dark-mode')) {
        theme = 'dark'
        themeToggleBtn.innerHTML = '<img src="sun.png" alt="라이트모드">' // 다크모드일 때는 해 이미지
      } else {
        themeToggleBtn.innerHTML = '<img src="moon.png" alt="다크모드">' // 라이트모드일 때는 달 이미지
      }

      // 현재 설정된 테마를 로컬 스토리지에 저장 (페이지 이동 시 유지되도록)
      localStorage.setItem('theme', theme)
    })
  }
})
