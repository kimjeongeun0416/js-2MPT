const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const result = document.querySelector('#result');
const endPoint = 10;
const select = [];


function calResult() {
    const result = select.reduce((a,b) => (a+b));
    console.log(result);
    return result;
    
}

function setResult() {
    let point = calResult();
    const resultScore = document.querySelector('.resultScore');
    const resultName = document.querySelector('.resultName');
    const resultDesc = document.querySelector('.resultDesc');

    const r60 = point > 60;
    const r50 = point > 50 && point <= 60
    const r40 = point > 40 && point <= 50
    const r30 = point > 30 && point <= 40
    const r20 = point > 20 && point <= 30
    const r10 = point <= 20;

    resultScore.innerHTML = '당신의 점수는 ' + point + '점입니다.';
    
    if (r60) {
        resultName.innerHTML = infoList[0].name;
        resultDesc.innerHTML = infoList[0].desc;
    } else if ( r50) {
        resultName.innerHTML = infoList[1].name;
        resultDesc.innerHTML = infoList[1].desc;
    } else if ( r40 ) {
        resultName.innerHTML = infoList[2].name;
        resultDesc.innerHTML = infoList[2].desc;
    } else if ( r30 ) {
        resultName.innerHTML = infoList[3].name;
        resultDesc.innerHTML = infoList[3].desc;
    } else if ( r20 ) {
        resultName.innerHTML = infoList[4].name;
        resultDesc.innerHTML = infoList[4].desc;
    } else {
        resultName.innerHTML = infoList[5].name;
        resultDesc.innerHTML = infoList[5].desc;
    }

    // if (r60) {
    //     resultDesc.innerHTML = infoList[0].desc;
    // } else if ( r50) {
    //     resultDesc.innerHTML = infoList[1].desc;
    // } else if ( r40 ) {
    //     resultDesc.innerHTML = infoList[2].desc;
    // } else if ( r30 ) {
    //     resultDesc.innerHTML = infoList[3].desc;
    // } else if ( r20 ) {
    //     resultDesc.innerHTML = infoList[4].desc;
    // } else {
    //     resultDesc.innerHTML = infoList[5].desc;
    // }
    
    // if (point > 60) {
    //     resultName.innerHTML = infoList[0].name;
    // } else if ( point > 50 && point <= 60) {
    //     resultName.innerHTML = infoList[1].name;
    // } else if ( point > 40 && point <= 50) {
    //     resultName.innerHTML = infoList[2].name;
    // } else if ( point > 30 && point <= 40) {
    //     resultName.innerHTML = infoList[3].name;
    // } else if ( point > 20 && point <= 30) {
    //     resultName.innerHTML = infoList[4].name;
    // } else {
    //     resultName.innerHTML = infoList[5].name;
    // }

    // const resultImg = document.createElement('img');
    // const imgDiv = document.querySelector('#resultImg');
    // const imgUrl = 'img/image-' + point + '.png';
    // resultImg.src = imgUrl;
    // resultImg.alt = point;
    // resultImg.classList.add('img-fluid');
    // imgDiv.appendChild(resultImg);

    
    //resultDesc.innerHTML = infoList[point].desc;
}
function goResult() {
    qna.style.webkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout( () => {        
        result.style.webkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout( () => {
            qna.style.display = "none";
            result.style.display = "block";
        }, 450)})
        
        setResult();
        calResult();
}

function addAnswer(answerText, qIdx, idx) {
    const a = document.querySelector('.answerBox');
    const answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener('click', function() {
        const children = document.querySelectorAll('.answerList');
        for( let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            children[i].style.webkitAnimation = 'fadeOut 0.5s';
            children[i].style.animation = 'fadeOut 0.5s';
        }
        setTimeout( () => {
            const target = qnaList[qIdx].a[idx].point;
            select.push(target);
            console.log(select);
            for( let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450)
    }, false);
}

function goNext(qIdx) {
    if (qIdx === endPoint) {
        goResult();
        return;
    }
    const q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for( let i in qnaList[qIdx].a) {
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }

    const status = document.querySelector('.statusBar');
    status.style.width = ( 100/endPoint ) * (qIdx + 1) + '%';
}

function begin() {
    main.style.webkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout( () => {        
        qna.style.webkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout( () => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}