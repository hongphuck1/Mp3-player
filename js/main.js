
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)



// const PLAYER_STORAGE_KEY = 'MP3-PLAY'
// config1: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

// setConfig: function (key, value) {
//     this.config[key] = value;
//     localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
// },

// loadConfig: function () {
//         this.isRandom = this.config.isRandom
//         this.isRepeat = this.config.isRepeat
//     },

// ranDomAudio.classList.toggle('active', this.isRandom)
// repeatAudio.classList.toggle('active', this.isRepeat)



const PLAYER_STORAGE_KEY = 'MP3-PLAY'

const player = $('.Player-Mp3') //khi có playing thì bắt đầu, còn không thì pause
const heading = $('.mp3-name') //tên nhạc
const CdThumb = $('.mp3-img') //đĩa cd ảnh
const audio = $('#audio') // nhạc 
const mp3Img = $('.mp3-img') //ản của cd
const playAudio = $('.start-btn-play') //bắt đầu play nhạc
const outAudio = $('.start-btn-pause') //pause nhạc
const progress = $('#progress') //thanh thời gian quận nhạc 
const NextSong = $('.btn-next')
const prevSong = $('.btn-prev')
const ranDomAudio = $('.btn-random')
const repeatAudio = $('.btn-repeat')
const playLists = $('.play-lists')



//1 objects đựng sự kiện sử lý
const app = {

    //vị trí số 0
    CurrentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    config1: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    //object api nhạc
    songs: [

        {
            name: 'Thương Em',
            singer: 'Châu Khải Phong',
            path: './mp3/ThuongEm.mp3',
            image: './img/ThuongEm.jpg'
        },
        {
            name: 'Hôm Nay Anh Rất Mệt',
            singer: 'Ngô Thành Dương ft Nguyễn Văn Chung',
            path: './mp3/HomNayAnhRatMet.mp3',
            image: './img/HomNayAnhRatMet.jpg'
        },
        {
            name: 'Vai "Ác"',
            singer: 'Phạm Quỳnh Anh & Linh Đan',
            path: './mp3/VaiAc.mp3',
            image: './img/VaiAc.jpg'
        },
        {
            name: 'Một Người Nhẹ Nhàng Hơn',
            singer: 'TRANG x TIÊN TIÊN',
            path: './mp3/MotNguoiNheNhangHon.mp3',
            image: './img/MotNguoiNheNhangHon.jpg'
        },
        {
            name: 'Anh Yêu Vội Thế',
            singer: 'LaLa Trần',
            path: './mp3/AnhYeuVoiThe.mp3',
            image: './img/AnhYeuVoiThe.jpg'
        },
        {
            name: 'Mẹ Em Nhắc Anh',
            singer: 'Orange x Hamlet Trương',
            path: './mp3/MeNhacTenAnh.mp3',
            image: './img/MeNhacTenAnh.jpg'
        },
        {
            name: 'Tình Thương Mến Thương',
            singer: 'Minh Giang x Trường Lê',
            path: './mp3/TinhThuongMenThuong.mp3',
            image: './img/TinhThuongMenThuong.jpg'
        },

    ],

    setConfig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
    },

    //render ra thư viện bài hát
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
                <div class="play-list ${index === this.CurrentIndex ? 'active' : ''}" data-index="${index}">
                    <div class="play-item">
                        <div class="play-item-img">
                            <img src="${song.image}"
                                alt="">
                        </div>
                        <div class="play-item-content">
                            <div class="play-item-content__name">${song.name}</div>
                            <div class="play-item-content__info">
                                <div class="content__info__singer">${song.singer}</div>
                            </div>
                        </div>

                    </div>
                <div class="play-item-icon">

                    <i class="play-item-icon-show ti-more"></i>
                    <div class="play-item-delete">Xoá</div>
                </div>
            </div>
                `
        })

        //render ra HTML
        playLists.innerHTML = htmls.join('');

    },

    //
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.CurrentIndex]
            }
        })
    },

    //Onscroll chuột
    handleEvent: function () {
        //trỏ tới app = _this
        const _this = this;

        //lấy chiều Width của class mp3Img( là cái background-image)
        const offSetWidth = mp3Img.offsetWidth

        //lấy chiều Height của class mp3Img( là cái background-image)
        const offSetheight = mp3Img.offsetHeight



        //xử lý cd quay / dừng
        // animate(keyframes, options)
        const CdThumbAnimate = CdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity,
        })



        CdThumbAnimate.pause()

        //sử lý phóng to thu nhỏ CD
        document.onscroll = function () {

            //Sự kiện window.scrollTop lăn tới đâu nó sẽ chỉnh sửa số tới đó...
            const scrollTop = window.scrollTop || document.documentElement.scrollTop

            //newOffSetTop = width của bg - window.scrollTop
            const newOffSetTop = offSetWidth - scrollTop

            //newOffSetHeight = Height của bg - window.scrollTop
            const newOffSetHeight = offSetheight - scrollTop

            //sửa style width = 
            mp3Img.style.width = newOffSetTop > 0 ? newOffSetTop + 'px' : 0
            mp3Img.style.opacity = newOffSetTop / offSetWidth

            mp3Img.style.height = newOffSetHeight > 0 ? newOffSetHeight + 'px' : 0
            mp3Img.style.opacity = newOffSetHeight / offSetheight
        }

        // onclick play nhạc
        playAudio.onclick = function () {
            audio.play()
            CdThumbAnimate.play()
        }

        //onclick pause nhạc
        outAudio.onclick = function () {
            audio.pause()
            CdThumbAnimate.pause()
        }

        //lắng nghe khi đã play
        audio.onplay = function () {
            _this.isPlaying = false
            player.classList.add('playing')
        }

        //lắng nghe khi đã pause
        audio.onpause = function () {
            _this.isPlaying = true
            player.classList.remove('playing')

        }

        //xử lý cái thanh thời gian nó chạy theo % nhạc
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent;
            }
        }

        //xử lý tua audio 
        progress.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime;
        }

        //next bài hát
        NextSong.onclick = function () {

            if (_this.isRandom) {
                _this.playRanDomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        //prev bài hát
        prevSong.onclick = function () {
            if (_this.isRandom) {
                _this.playRanDomSong()
            } else {

                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()


        }

        //xử lý sự kiện random bài hát
        ranDomAudio.onclick = function () {

            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            ranDomAudio.classList.toggle('active', _this.isRandom)

        }

        //xử lý sự kiện lặp lại bài hát
        repeatAudio.onclick = function () {

            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)

            repeatAudio.classList.toggle("active", _this.isRepeat)

        }

        //sử lý sự kiện khi chạy hết bài hát.
        audio.onended = function () {

            if (_this.isRepeat) {
                audio.play()
            } else {
                NextSong.click()
            }

        }

        //click vào list bài hát, và chuyển bài hát
        playLists.onclick = function (e) {

            const songNode = e.target.closest('.play-list:not(.active)')
            const btnElement = e.target.closest('.play-item-icon')

            //target vào nếu mà (class không có cái .active) hoặc ( có class nút 3 chấm)
            if (songNode || btnElement) {

                //xử lý bấm bài hát
                if (songNode && !btnElement) {
                    _this.CurrentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                    _this.scrollToActiveSong()

                }

                //xử lý bấm nút 3 chấm bên bài hát
                if (btnElement) {

                }

            }

        }

    },


    scrollToActiveSong: function () {

        setTimeout(function () {
            $('.play-list.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })

        }, 500)
    },

    //load tên, ảnh, audio của web
    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name
        CdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },

    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    nextSong: function () {
        this.CurrentIndex++;

        if (this.CurrentIndex >= this.songs.length) {
            this.CurrentIndex = 0
        }
        this.loadCurrentSong()
    },

    prevSong: function () {
        this.CurrentIndex--;

        if (this.CurrentIndex < 0) {
            this.CurrentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },

    playRanDomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.CurrentIndex)

        this.CurrentIndex = newIndex
        this.loadCurrentSong()

    },

    //bắt đầu
    start: function () {

        //gán cấu hình từ config vàoo ứng dụng
        this.loadConfig()

        //định nghĩa các thuộc tính cho objects
        this.defineProperties()

        //lắng nghe, sử lý các sự kiện ( DOM events)
        this.handleEvent()

        //Tải bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()


        //Render playlist
        this.render()

        //hiển thị trạng thái ban đầu của btn ramrom và repeat
        ranDomAudio.classList.toggle('active', this.isRandom)
        repeatAudio.classList.toggle('active', this.isRepeat)

    }
}
app.start()


