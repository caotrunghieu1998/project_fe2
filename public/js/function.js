//Toạ độ của Trym ban đầu
let birdStartY = 0;
//Toạ độ của các ống lúc ban đầu
let pipeStartX = 0;
//Vị trí của các ống lúc ban đầu (So với mé bên trái của màn hình)
let pipe_location = 1800;
//Khoảng các giữa 2 ống
const distance_between_pipe = 400;
//Số lượng các ống
const pipe_number = 2;
//Khoảng các giữa 2 ống bot và top
const distance_top_bottom = 200;
//Thời gian chym và các ống di chuyển (mili giây)
const time_animotion = 100;
//Thứ tự ống tương tác với Trym hiện tại
let number_pipe = 0;
//Kiểm tra trạng thái của game
let game_status = 'Loadding';
//Chủ để của game
let game_theme = "original";
//Mảng danh sách ống random
const pipe_top_array = ['pipe-top-1.png', 'pipe-top-2.png'];
const pipe_bottom_array = ['pipe-bottom-1.png', 'pipe-bottom-2.png'];
//Lưu giá trị nhạc
let music_status = `On`;
//game animation
let game_animation;


//Sự kiện khi nhấn 1 phím gì đó trên bàn phím
const keyUpSpace = document.addEventListener('keyup', function (event) {
    //Nhấn nút enter nhỏ bên tay phải để tắt/mở nhạc
    if (event.code == 'NumpadEnter') {
        if (music_status == "On") {
            turnOffOriginalMusic();
            music_status = "Off";
        } else {
            turnOnOriginalMusic();
            music_status = "On";
        }
    }
    //Các Nút Animotion chỉ có hiệu lực khi game đang đc chơi
    if (game_status == "Playing") {
        let bird = document.querySelector(".bird");
        //Nhấn cút cách thì trym bay lên
        if (event.code === 'Space') {
            birdStartY -= 30;
            bird.style.transform = `translateY(${birdStartY}px) rotate(-20deg)`;
        } //Nhấn nút mũi tên xuống thì Trym bay xuống
        else if (event.code === 'ArrowDown') {
            birdStartY += 30;
            bird.style.transform = `translateY(${birdStartY}px) rotate(20deg)`;
        } //Nhấn nút mũi tên lên thì Trym bay lên nhanh hơn
        else if (event.code === 'ArrowUp') {
            birdStartY -= 50;
            bird.style.transform = `translateY(${birdStartY}px) rotate(-20deg)`;
        }
    }
});
//Chuyển động của các trym khi không làm gì
const bird_animation = () => {
    let bird = document.querySelector(".bird");
    birdStartY += 15;
    bird.style.transform = `translateY(${birdStartY}px) rotate(20deg)`;
}
//Set up vị trí và chiều cao của các ống nước khi game bắt đầu
const PipeSetUp = () => {
    let pipeTop = document.querySelectorAll(".pipe-top");
    let pipeBottom = document.querySelectorAll(".pipe-bottom");
    let pipe_top_image, pipe_bottom_image;
    for (let i = 0; i < pipeTop.length; i++) {
        const pipe_top_height = RandomNumber(20, 500);
        pipe_top_image = pipe_top_array[RandomNumber(0, pipe_top_array.length - 1)];
        pipe_bottom_image = pipe_bottom_array[RandomNumber(0, pipe_bottom_array.length - 1)];
        pipeTop[i].style.height = `${pipe_top_height}px`;
        pipeTop[i].style.left = `${pipe_location}px`;
        pipeTop[i].style.backgroundImage = `url('images/${game_theme}/${pipe_top_image}')`;

        pipeBottom[i].style.left = `${pipe_location}px`;
        pipeBottom[i].style.top = `${distance_top_bottom + pipe_top_height}px`;
        pipeBottom[i].style.backgroundImage = `url('images/${game_theme}/${pipe_bottom_image}')`;
        pipe_location += distance_between_pipe;
    }
}
//Tạo ra các ống
const PipeCountSetUp = (num) => {
    let pipe_top_item = document.querySelector(".pipe-top-item");
    let pipe_bottom_item = document.querySelector(".pipe-bottom-item");
    const a_pipe_top = pipe_top_item.innerHTML;
    const a_pipe_bottom = pipe_bottom_item.innerHTML;
    pipe_top_item.innerHTML = "";
    pipe_bottom_item.innerHTML = "";
    for (let i = 0; i < num; i++) {
        pipe_top_item.innerHTML += a_pipe_top;
        pipe_bottom_item.innerHTML += a_pipe_bottom;
    }
}
//Chuyển động của các ống nước
const pipe_animation = () => {
    if (number_pipe <= 10) {
        pipeStartX += 15;
    } else if (number_pipe <= 20) {
        pipeStartX += 20;
    } else if (number_pipe <= 30) {
        pipeStartX += 25;
    } else {
        pipeStartX += 30;
    }
    let pipe_top = document.querySelectorAll(".pipe-top");
    let pipe_bottom = document.querySelectorAll(".pipe-bottom");
    pipe_top.forEach(pipe => {
        pipe.style.transform = `translateX(-${pipeStartX}px)`;
    });
    pipe_bottom.forEach(pipe => {
        pipe.style.transform = `translateX(-${pipeStartX}px)`;
    });
}
//Hàm kiểm tra thua game
const checkGameOver = () => {
    //Bắt các thông số vị trí của Trym
    let bird = document.querySelector(".bird");
    let birdPosition = bird.getBoundingClientRect();
    //Nếu trym đang ở trong môi trường ống thì kiểm tra xem Trym có đập mặt vào ống trên hay ống dưới không
    if (checkBirdGoToPipe()) {
        const pipe_position_top = document.querySelectorAll(".pipe-top")[number_pipe].getBoundingClientRect();
        const pipe_position_bottom = document.querySelectorAll(".pipe-bottom")[number_pipe].getBoundingClientRect();
        if (pipe_position_top.height >= birdPosition.y || (birdPosition.y + 40) >= pipe_position_bottom.y) {
            game_status = "Lost";
            return true;
        }
        return false;
    }
    if (game_status == "Win") {
        return true;
    }
    //Nếu Trym đập mặt vào đất hoặc trời thì thua
    if (birdPosition.bottom >= 655 || birdPosition.top <= 0) {
        game_status = "Lost";
        return true;
    }
    return false;
}
//Hàm kiểm tra chim bay vào vùng ống
const checkBirdGoToPipe = () => {
    let pipe_top = document.querySelectorAll(".pipe-top");
    let birdPosition = document.querySelector(".bird").getBoundingClientRect();
    const pipePosition = pipe_top[number_pipe].getBoundingClientRect();
    if (pipePosition.left <= (birdPosition.left + 30) && pipePosition.left > 115) {
        return true;
    }
    if (pipePosition.left < birdPosition.left && number_pipe != pipe_top.length) {
        number_pipe++;
        //Mở nhạc qua 1 ống
        const music = document.querySelector("#sound-get-scores");
        music.autoplay = true;
        music.volume = 0.5;
        music.load();
        document.querySelector(".scores").innerHTML = `<b>Scores: <i>${number_pipe}</i></b>`;
        if (number_pipe == pipe_top.length) {
            game_status = "Win";
            number_pipe--;
        }
        return false;
    }
    return false;
}
//Hàm chạy game
const app_run = () => {
    game_status = "Playing";
    turnOnOriginalMusic();
    game_animation = setInterval(() => {
        //Nếu thua game thì k Set animation
        if (checkGameOver()) {
            turnOffOriginalMusic();
            clearInterval(game_animation);
            //Show menu điểm ra
            document.querySelector(".scores-total").textContent = number_pipe;
            if (game_status == `Win`) {
                alert("Wow, you win !!");
                document.querySelector(".scores-total").textContent = pipe_number;
                document.querySelector(".pyro .before").style.display = "inline";
                document.querySelector(".pyro .after").style.display = "inline";
            }
            document.querySelector('#scores-screen').style.display = 'inline';
        } else if (game_status == "Playing") { 
            pipe_animation();
            bird_animation();
        }
    }, time_animotion);
    alert("Start");
    setTimeout(() => {
        setUpMore();
        PipeCountSetUp(pipe_number);
        PipeSetUp();
        game_animation;
    }, 1000);

}
//Hàm trả game về mặc định
const setDefaultGame = () => {
    clearInterval(game_animation);
    let bird = document.querySelector(".bird");
    bird.style.top = "250px";
    bird.style.left = "150px";
    bird.style.transform = `translateY(0px)`;
    document.querySelector(".pipe-top-item").innerHTML = `<div class ="pipe-top"></div>`;
    document.querySelector(".pipe-bottom-item").innerHTML = `<div class ="pipe-bottom"></div>`;
    birdStartY = 0;
    pipeStartX = 0;
    number_pipe = 0;
    pipe_location = 1800;
};
//Hàm random số
function RandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//Mở nhạc nền
const turnOnOriginalMusic = () => {
    let auto_play = document.getElementById('autoplay');
    auto_play.autoplay = true;
    auto_play.volume = 1;
    auto_play.load();
}
//Tắt nhạc nền
const turnOffOriginalMusic = () => {
    let auto_play = document.getElementById('autoplay');
    auto_play.autoplay = false;
    auto_play.load();
}
//Sự kiện khi nhấn vào nut Start
function letStart() {
    let start_screen = document.querySelector(".start-screen");
    start_screen.style.display = "none";
    game_status = "Playing";
    //Thay đổi nhạc Ingame
    let autoplay = document.querySelector("#autoplay");
    autoplay.querySelector("source").src = `mp3/${game_theme}/bg-music.mp3`;
    //Ẩn nút quay lại đi
    document.querySelector('.button-back').style.display = `none`;
    //Hiện nút Play lên
    document.querySelector(".button-pause").style.display = "inline";
    turnOnOriginalMusic();
    app_run();
}
function choiseTheme(theme) {
    //Lưu chủ đề chơi lại
    game_theme = theme;
    //Set Các giá trị về giá trị mặc định
    //Set hình nền màn hình chờ
    let img_bg_start = document.querySelector(".img-bg-start");
    img_bg_start.style.background = `url("images/${theme}/background-watiing.jpg")`;
    img_bg_start.style.backgroundSize = "cover";
    //Set giá trị hình nền trong game
    let background_app = document.querySelector(".background-app");
    background_app.style.background = `url("images/${theme}/full-hd-bg.png")`;
    //Set giá trị con Trym trong game
    let bird = document.querySelector(".bird");
    bird.style.backgroundImage = `url('images/${game_theme}/bird.png')`;
    //Mặt đất
    let foreground = document.querySelector(".foreground");
    foreground.style.backgroundImage = `url('images/${game_theme}/fg.png')`;
    //Nhạc nền cho màng hình chờ
    let autoplay = document.querySelector("#autoplay");
    autoplay.querySelector("source").src = `mp3/${game_theme}/waitting-music.mp3`;
    turnOnOriginalMusic();
    //Âm thanh khi ghi đc 1 điểm
    document.querySelector("#sound-get-scores source").src = `mp3/${game_theme}/get-scores.mp3`;
    //Ẩn màn hình hiện tại đi
    let choose_theme_screen = document.querySelector(".choose-theme-screen");
    choose_theme_screen.style.display = "none";
    //Hiện màn hình thứ 2 lên
    document.querySelector(".start-screen").style.display = `inline`;
    //Hiện nút quay lại lên
    document.querySelector('.button-back').style.display = `inline`;
}
//Set up thêm các thông số cho phú hợp với từng chủ để
const setUpMore = () => {
    let pipe_top = document.querySelector(".pipe-top");
    let pipe_bottom = document.querySelector(".pipe-bottom");
    let bird = document.querySelector(".bird");
    if (game_theme == 'original') {
        pipe_top.style.backgroundSize = "auto";
        pipe_bottom.style.backgroundSize = "auto";
        return;
    }
    if (game_theme == 'greek-times') {
        pipe_top.style.backgroundSize = `auto`;
        pipe_bottom.style.backgroundSize = `auto`;
        return;
    }
    if (game_theme == 'among-us') {
        bird.style.backgroundSize = `contain`;
        pipe_top.style.backgroundSize = "cover";
        pipe_bottom.style.backgroundSize = "cover";
        return;
    }
};
//Sử lý sự kiện cho button back
let button_back = document.querySelector('.button-back');
button_back.addEventListener('click', (e) => {
    e.preventDefault();
    let screen_1 = document.querySelector(".choose-theme-screen");
    let screen_2 = document.querySelector(".start-screen");
    screen_1.style.display = `inline`;
    screen_2.style.display = `none`;
    button_back.style.display = `none`;
});
// Hàm pause game
const PauseGame = () => {
    game_status = "Pause";
};
//Hàm tiếp tục game
const Continued = () => {
    alert("Continued Game !!");
    game_status = "Playing";
}
//Sử lý sự kiện cho button pause
let button_pause = document.querySelector(".button-pause");
button_pause.addEventListener(`click`, (e) => {
    //Tắt pháo hoa
    document.querySelector(".pyro .before").style.display = "none";
    document.querySelector(".pyro .after").style.display = "none";
    e.preventDefault();
    button_pause.style.backgroundImage = `url("images/button/continue.gif")`;
    button_pause.title = "Game Paused";
    show_menu();
    button_pause.blur();
});
//Hàm show menu game
const show_menu = () => {
    document.querySelector('#menu-game').style.display = `inline`;
    PauseGame();
}
//Xử lý Click cho các button menu game
let menu_game_button = document.querySelectorAll(".menu-game-button");
menu_game_button.forEach(button => {
    button.addEventListener('click', () => {
        const button_value = button.textContent;
        let button_pause = document.querySelector(".button-pause");
        //Nút Resume
        if (button_value == 'Resume') {
            button_pause.style.backgroundImage = `url("images/button/pause.png")`;
            button_pause.title = "Pause";
            document.querySelector('#menu-game').style.display = `none`;
            Continued();
        } else if (button_value == 'Replay') {
            alert("Replay");
            setDefaultGame();
            app_run();
            document.querySelector('#menu-game').style.display = `none`;
            button_pause.style.backgroundImage = `url("images/button/pause.png")`;
            document.querySelector('#scores-screen').style.display = 'none';
        } else if (button_value == 'On/off music') {
            if (music_status == "On") {
                turnOffOriginalMusic();
                music_status = "Off";
            } else {
                turnOnOriginalMusic();
                music_status = "On";
            }

        } else if (button_value == 'Exit') {
            if (confirm('Are you sure you want to exit ?')) {
                alert("Exit !!");
                location.reload();
            }
        }

    });
});
//Xử lý các button trong bảng điểm
let btn_scores_menu = document.querySelectorAll(".scores-screen-button");
btn_scores_menu.forEach(button => {
    button.addEventListener('click', () => {
        const btn_value = button.textContent;
        if (btn_value == `Replay`) {
            alert("Replay");
            let bird = document.querySelector(".bird");
            bird.style.top = "250px";
            bird.style.left = "150px";
            //Tắt pháo hoa
            document.querySelector(".pyro .before").style.display = "none";
            document.querySelector(".pyro .after").style.display = "none";

            setDefaultGame();
            app_run();
            document.querySelector('#scores-screen').style.display = 'none';
        } else {
            if (confirm('Are you sure you want to exit ?')) {
                alert("Exit !!");
                location.reload();
            }
        }
    });
});






