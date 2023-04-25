import "./onboardingPage.scss"
import onboarding from "../../../resources/onboarding.png"

import { Link } from 'react-router-dom';

const OnboardingPage = () => {
    return (
        <div className="page-content">
            <div className="app-section onboarding">
                <div className="onboarding-group">
                    <div className="onboarding-header">
                        Консультации экспертов<br/>из любых областей
                    </div>
                    <div className="onboarding-description">
                        Здесь вы можете подобрать подходящего вам<br/>
                        эксперта по специальности, стоимости, рейтингу<br/>
                        и отзывам
                    </div>
                    <Link to={"/mentors"} className="onboarding-button button">
                        Перейти к выбору ментора
                    </Link>
                </div>
                <img className="onboarding-picture" src={onboarding} alt="" />
            </div>
        </div>
    )
}

export default OnboardingPage;