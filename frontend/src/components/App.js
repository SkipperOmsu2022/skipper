import "./app.scss"

const App = () => {
    return (
        <section className="wrapper">
            <div className="authentication">
                <header className="authentication__header">
                    <span className="authentication__title">Skipper</span>
                </header>

                <div className="authentication__content form">
                    <div className="form__header">
                        <a href="" className="tab left">ВХОД</a>
                        <a href="" className="tab right active">РЕГИСТРАЦИЯ</a>
                    </div>
                    <div className="form__content">
                        <input placeholder="Фамилия, имя" type="text" className="form__input"/>
                        <input placeholder="Email" type="text" className="form__input"/>
                        <input placeholder="Пароль" type="text" className="form__input"/>
                        <button className="form__apply-button">ЗАРЕГИСТРИРОВАТЬСЯ</button>
                        <a  href="" className="registration">Уже есть аккаунт? Вход</a>
                        <div className="form__footer">Входя в систему и регистрируясь, вы соглашаетесь с <a href="" className="policy">политикой безопасности</a> и <a href="" className="rules">правилами поведения</a> Skipper</div>
                    </div>
                    {/* <div className="form__header">
                        <a href="" className="tab left active">ВХОД</a>
                        <a href="" className="tab right">РЕГИСТРАЦИЯ</a>
                    </div>
                    <div className="form__content">
                        <input placeholder="Email" type="text" className="form__input"/>
                        <input placeholder="Пароль" type="text" className="form__input"/>
                        <a  href="" className="forgot-password">Забыли пароль?</a>
                        <button className="form__apply-button">ВОЙТИ</button>
                        <a  href="" className="registration">Ещё нет аккаунта? Регистрация</a>
                        <div className="form__footer">Входя в систему и регистрируясь, вы соглашаетесь с <a href="" className="policy">политикой безопасности</a> и <a href="" className="rules">правилами поведения</a> Skipper</div>
                    </div> */}
                        
                </div>
            </div>
        </section>
    )
}

export default App;