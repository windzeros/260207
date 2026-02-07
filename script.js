// ===== HTML 요소 가져오기 =====
// 자바스크립트에서 사용할 HTML 요소들을 변수에 저장
var chatArea = document.getElementById('chatArea');       // 채팅 메시지가 표시되는 영역
var userInput = document.getElementById('userInput');     // 사용자가 입력하는 텍스트 입력창
var sendButton = document.getElementById('sendButton');   // 전송 버튼

// ===== 상담 응답 데이터 =====
// 키워드별로 상담사가 응답할 메시지를 미리 준비해둔 객체
// 각 카테고리에는 여러 개의 응답이 있어서 랜덤으로 선택됨
var responses = {

    // 스트레스 관련 키워드와 응답
    스트레스: {
        keywords: ['스트레스', '힘들', '지치', '피곤', '번아웃', '압박', '부담', '벅차', '못하겠', '한계'],
        replies: [
            '많이 지치셨군요. 그 마음 충분히 이해해요. 잠시 깊은 숨을 함께 쉬어볼까요?',
            '힘든 상황 속에서도 여기까지 버텨온 당신은 정말 대단해요. 지금 가장 큰 부담이 뭔지 이야기해 주실 수 있나요?',
            '스트레스가 쌓이면 몸과 마음 모두 힘들어지죠. 오늘은 자신에게 작은 휴식을 선물해 보는 건 어떨까요?'
        ]
    },

    // 불안 관련 키워드와 응답
    불안: {
        keywords: ['불안', '걱정', '무서', '두려', '떨리', '긴장', '초조', '겁나', '공포'],
        replies: [
            '불안한 마음이 드시는군요. 그 감정은 아주 자연스러운 거예요. 지금 가장 걱정되는 것이 무엇인가요?',
            '걱정이 많으시군요. 불안할 때는 지금 이 순간에 집중해 보는 것이 도움이 될 수 있어요. 천천히 숨을 들이쉬고 내쉬어 볼까요?',
            '두려운 마음을 느끼는 것은 용기가 없는 게 아니에요. 오히려 그 감정을 인식하는 것 자체가 큰 용기랍니다.'
        ]
    },

    // 우울 관련 키워드와 응답
    우울: {
        keywords: ['우울', '슬프', '눈물', '울고', '울어', '암울', '절망', '희망이 없', '의미 없', '무기력'],
        replies: [
            '마음이 많이 무거우시군요. 슬플 때 울어도 괜찮아요. 감정을 표현하는 것은 아주 건강한 방법이에요.',
            '지금 힘든 시간을 보내고 계시는군요. 어둠 뒤에는 반드시 빛이 찾아와요. 당신은 혼자가 아니에요.',
            '우울한 감정이 드실 때, 무리하지 않아도 괜찮아요. 오늘 하루 잘 버텨낸 것만으로도 충분히 훌륭해요.'
        ]
    },

    // 외로움 관련 키워드와 응답
    외로움: {
        keywords: ['외로', '혼자', '고독', '쓸쓸', '아무도', '친구가 없', '관심', '소외'],
        replies: [
            '외로운 마음이 드시는군요. 저는 항상 여기서 당신의 이야기를 듣고 있어요. 편하게 말씀해 주세요.',
            '혼자라고 느껴질 때가 있죠. 하지만 이렇게 마음을 열어주신 것만으로도 큰 한 걸음이에요.',
            '외로운 감정은 누구나 느낄 수 있어요. 지금 이 순간, 제가 당신의 이야기에 귀 기울이고 있다는 걸 기억해 주세요.'
        ]
    },

    // 인간관계 관련 키워드와 응답
    인간관계: {
        keywords: ['관계', '친구', '가족', '연인', '이별', '싸움', '갈등', '배신', '사람', '직장 동료', '왕따'],
        replies: [
            '인간관계에서 어려움을 겪고 계시군요. 관계의 문제는 정말 마음이 아프죠. 어떤 상황인지 좀 더 이야기해 주실 수 있나요?',
            '사람과의 관계에서 상처받는 것은 정말 힘든 일이에요. 당신의 감정은 충분히 타당해요.',
            '갈등 상황에서는 서로의 입장을 이해하는 시간이 필요해요. 지금 가장 힘든 부분이 무엇인지 들려주세요.'
        ]
    },

    // 자존감 관련 키워드와 응답
    자존감: {
        keywords: ['자존감', '자신감', '못생', '못난', '부족', '실패', '무능', '바보', '열등', '비교', '자격'],
        replies: [
            '자신에 대해 힘든 감정을 느끼고 계시군요. 당신은 있는 그대로 충분히 가치 있는 사람이에요.',
            '다른 사람과 비교할 필요 없어요. 당신만의 속도가 있고, 당신만의 빛이 있어요. 스스로에게 좀 더 따뜻해져 볼까요?',
            '실패는 끝이 아니라 성장의 과정이에요. 지금 느끼는 감정을 인정하되, 자신을 너무 몰아세우지 마세요.'
        ]
    },

    // 수면/건강 관련 키워드와 응답
    수면: {
        keywords: ['잠', '수면', '불면', '못 자', '새벽', '악몽', '깨어'],
        replies: [
            '잠을 잘 못 주무시고 계시군요. 수면은 마음 건강에 아주 중요해요. 잠들기 전에 따뜻한 차 한 잔은 어떠세요?',
            '불면이 지속되면 정말 힘들죠. 자기 전에 가볍게 스트레칭을 하거나, 편안한 음악을 들어보는 건 어떨까요?',
            '밤에 생각이 많아지면 잠들기 어렵죠. 오늘 걱정은 내일의 나에게 맡기고, 지금은 편안히 쉬어보세요.'
        ]
    }
};

// ===== 기본 응답 =====
// 어떤 키워드에도 해당하지 않을 때 보여줄 일반적인 응답들
var defaultReplies = [
    '이야기를 들려주셔서 감사해요. 좀 더 자세히 이야기해 주실 수 있나요?',
    '당신의 마음이 궁금해요. 어떤 감정이 드시나요?',
    '편하게 말씀해 주세요. 저는 언제든 당신의 이야기를 들을 준비가 되어 있어요.',
    '그렇군요. 그 상황에서 어떤 기분이 드셨나요?',
    '당신의 이야기에 귀 기울이고 있어요. 천천히 이야기해 주세요.'
];

// ===== 환영 메시지 =====
// 페이지가 처음 로드될 때 상담사가 보내는 인사 메시지
var welcomeMessages = [
    '안녕하세요! "내 이야기를 들어줘!"에 오신 것을 환영해요.',
    '저는 24시간 당신의 이야기를 들어주는 심리 상담사예요. 오늘 하루는 어떠셨나요? 편하게 이야기해 주세요.'
];

// ===== 함수 정의 =====

/**
 * 채팅 영역에 메시지를 추가하는 함수
 * @param {string} text - 표시할 메시지 내용
 * @param {string} sender - 메시지 보낸 사람 ('user' 또는 'counselor')
 */
function addMessage(text, sender) {
    // 새로운 div 요소를 만듦
    var messageDiv = document.createElement('div');

    // 메시지 스타일 클래스 추가 (user 또는 counselor)
    messageDiv.className = 'message ' + sender;

    // 상담사 메시지인 경우 이름 라벨을 추가
    if (sender === 'counselor') {
        var nameSpan = document.createElement('div');
        nameSpan.className = 'name';
        nameSpan.textContent = '상담사';
        messageDiv.appendChild(nameSpan);
    }

    // 메시지 텍스트 추가
    var textSpan = document.createElement('span');
    textSpan.textContent = text;
    messageDiv.appendChild(textSpan);

    // 채팅 영역에 메시지 추가
    chatArea.appendChild(messageDiv);

    // 새 메시지가 보이도록 자동으로 맨 아래로 스크롤
    chatArea.scrollTop = chatArea.scrollHeight;
}

/**
 * 타이핑 중 표시(점 세 개 애니메이션)를 보여주는 함수
 * 상담사가 응답을 준비하는 동안 표시됨
 */
function showTypingIndicator() {
    var typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';

    // 점 세 개 추가
    for (var i = 0; i < 3; i++) {
        var dot = document.createElement('div');
        dot.className = 'dot';
        typingDiv.appendChild(dot);
    }

    chatArea.appendChild(typingDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

/**
 * 타이핑 중 표시를 제거하는 함수
 */
function removeTypingIndicator() {
    var indicator = document.getElementById('typingIndicator');
    if (indicator) {
        indicator.remove();
    }
}

/**
 * 사용자 메시지를 분석하여 적절한 상담 응답을 찾는 함수
 * 키워드 매칭 방식으로 카테고리를 찾고, 해당 카테고리의 응답 중 하나를 랜덤 선택
 * @param {string} userMessage - 사용자가 입력한 메시지
 * @returns {string} 상담사의 응답 메시지
 */
function getResponse(userMessage) {
    // 모든 카테고리를 순회하면서 키워드 매칭
    var categories = Object.keys(responses);

    for (var i = 0; i < categories.length; i++) {
        var category = responses[categories[i]];

        // 해당 카테고리의 키워드들을 하나씩 확인
        for (var j = 0; j < category.keywords.length; j++) {
            // 사용자 메시지에 키워드가 포함되어 있는지 확인
            if (userMessage.includes(category.keywords[j])) {
                // 해당 카테고리의 응답 중 랜덤으로 하나를 선택
                var randomIndex = Math.floor(Math.random() * category.replies.length);
                return category.replies[randomIndex];
            }
        }
    }

    // 어떤 키워드에도 해당하지 않으면 기본 응답 중 랜덤 선택
    var randomIndex = Math.floor(Math.random() * defaultReplies.length);
    return defaultReplies[randomIndex];
}

/**
 * 사용자가 메시지를 전송할 때 실행되는 메인 함수
 * 1. 사용자 메시지를 화면에 표시
 * 2. 타이핑 표시를 보여줌
 * 3. 잠시 후 상담사 응답을 표시
 */
function sendMessage() {
    // 입력창에서 메시지 가져오기 (앞뒤 공백 제거)
    var message = userInput.value.trim();

    // 빈 메시지는 전송하지 않음
    if (message === '') {
        return;
    }

    // 사용자 메시지를 화면에 추가
    addMessage(message, 'user');

    // 입력창 비우기
    userInput.value = '';

    // 상담사가 타이핑하는 것처럼 표시
    showTypingIndicator();

    // 1초 후에 상담사 응답을 보여줌 (타이핑하는 느낌을 주기 위한 딜레이)
    setTimeout(function() {
        // 타이핑 표시 제거
        removeTypingIndicator();

        // 적절한 응답을 찾아서 화면에 추가
        var response = getResponse(message);
        addMessage(response, 'counselor');
    }, 1000);
}

// ===== 이벤트 연결 =====

// 전송 버튼을 클릭하면 메시지 전송
sendButton.addEventListener('click', function() {
    sendMessage();
});

// Enter 키를 누르면 메시지 전송
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// ===== 페이지 로드 시 환영 메시지 표시 =====
// 페이지가 열리면 상담사가 환영 인사를 보냄
window.addEventListener('load', function() {
    // 첫 번째 환영 메시지를 0.5초 후에 표시
    setTimeout(function() {
        addMessage(welcomeMessages[0], 'counselor');

        // 두 번째 환영 메시지를 1.5초 후에 표시
        setTimeout(function() {
            addMessage(welcomeMessages[1], 'counselor');
        }, 1000);
    }, 500);
});
