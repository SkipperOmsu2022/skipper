const CommunicationContent = ({communication}) => {
    const links = communication?.filter((item) => (item.name && item.link)).map((item, i) => {
        return (
            <div className="profile__contact" key={i}>
                <div className="profile__contact-label">
                    {item.name}:
                </div>
                <div className="profile__contact-link">
                    {item.link}
                </div>
            </div>
        )
    })
    
    return (
        <div className="profile__section-column">
            <div className="profile__section-label">Контакты</div>
            {
                links?.length !== 0 ? links :
                <div className="profile__no-info">
                    Пользователь не предоставил контакты для связи
                </div>
            }
        </div>
    );
}

export default CommunicationContent