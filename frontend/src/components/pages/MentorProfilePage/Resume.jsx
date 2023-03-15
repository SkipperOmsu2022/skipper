const Resume = () => {
    return (
        <div className="app-section profile mentor not-working">
                    <div className="profile__header">Резюме</div>
                    <div className="profile__resume">
                        <div className="profile__resume-row">
                            <div className="profile__resume-header">Образование</div>
                            <div className="profile__resume-header">Опыт работы</div>
                            <div className="profile__resume-header">Сертификаты</div>
                            <div className="profile__resume-header">Прочее</div>
                        </div>
                        <div className="profile__divider padding"></div>
                        <div className="profile__resume-row">
                            <div className="profile__resume-column">
                                <div className="profile__resume-column-text">2001 - 2005 <br/> Магистр, <br/> Уральский Юридический Институт</div>
                                <div className="profile__resume-column-text">2007 - 2011 <br/> Магистр, <br/> Уральский Юридический Институт</div>
                            </div>
                            <div className="profile__resume-column">
                                <div className="profile__resume-column-text">2005 - 2010 <br/> ОАО Сбербанк России</div>
                                <div className="profile__resume-column-text">2010 - 2020 <br/> Собственное ИП</div>
                            </div>
                            <div className="profile__resume-column">
                                <div className="profile__resume-column-wrapper">
                                    <img className="profile__resume-column-image" src="https://blotos.ru/wp-content/uploads/7/2/9/7291bdb944dc662993b6c841a4e5d2b9.jpg" alt="" />
                                </div>
                                <div className="profile__resume-column-wrapper">
                                    <img className="profile__resume-column-image" src="http://baaspik.ru/wp-content/uploads/2015/05/Образец-сертификата.jpg" alt="" />
                                </div>
                            </div>
                            <div className="profile__resume-column">
                                <div className="profile__resume-column-text">Место №3 во всероссийском конкурсе “Алло, мы ищем таланты”</div>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

export default Resume;