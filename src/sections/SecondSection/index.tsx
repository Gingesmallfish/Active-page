import { FC, useEffect, useRef, useState } from "react";
import CartoonImage from '../../assets/cartoon.jpg'
import MovieImage from '../../assets/movie.png'
import LifeImage from '../../assets/life.jpg'
import FoodImage from '../../assets/food.jpg'
import LogoImage from '../../assets/logo.png'

import styles from "./styles.module.scss"
import classNames from "classnames";


const SecondSection: FC = () => {
    /**
     * @param tabs[string]
     */
    const tabs = [
        {
            key: 'cartoon',
            title: '动画',
            Image: CartoonImage

        },
        {
            key: 'food',
            title: '美食',
            Image: FoodImage
        },
        {
            key: 'movie',
            title: '电影',
            Image: MovieImage
        },
        {
            key: 'life',
            title: '生活',
            Image: LifeImage
        }
    ]

    const TAB_HEIGHT = 56;
    //1. 点击 Tab 滚动跳转 x
    //2. 滚动时，高亮 tab x
    //4。 按钮吸底 x
    const [activeTab, setActiveTab] = useState('cartoon')

    // 状态
    const [isFixed, setIsFixed] = useState<boolean>(false)

    // api
    const secondSectionRef = useRef<HTMLDivElement>(null)

    const activate = (key: string) => {
        setActiveTab(key);

        const tabContentEl = document.querySelector(`[data-id=${key}]`);

        if (tabContentEl) {
            tabContentEl.scrollIntoView({
                behavior: 'smooth',
            })
        }
    }

    //3。 tabs 吸顶

    const onScroll = () => {
        if (secondSectionRef.current) {
            const { top } = secondSectionRef.current.getBoundingClientRect();
            /*
            *  这里有优化一下
            * */
            setIsFixed(top <= 0)
            // if (top <= 0) {
            //     //吸顶
            //     setIsFixed(true)
            // } else  {
            //     // 不吸顶
            //     setIsFixed(false)
            // }

            const sectionNodes = secondSectionRef.current.querySelectorAll('section');

            Array.from(sectionNodes).forEach(sectionEl => {

                const { top } = sectionEl.getBoundingClientRect();

                const key = sectionEl.getAttribute('data-id') || '';
                if (top <= TAB_HEIGHT) {
                    setActiveTab(key);
                }
            })
        }

    }

    // 监听到w全局windows
    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        // 消除
        return () => {
            window.removeEventListener('scroll', onScroll);
        }

    }, [onScroll])


    return (
        <div className={styles.secondSection} ref={secondSectionRef}>
            {/*  这里我们 activeTab 单独的抽出来，我们写成数组的形式,然后进行在页面给上渲染  */}
            <ul className={classNames({ [styles.isFixed]: isFixed })}>
                {tabs.map(tab => (
                    <li key={tab.key} onClick={() => activate(tab.key)}>
                        <span>{tab.title}</span>
                        {/*  下划线line  */}
                        <span className={classNames(styles.line, { [styles.visible]: activeTab === tab.key })} />
                    </li>
                ))}
            </ul>
            {/*Tab + Content*/}
            <div>
                {tabs.map(tab => (
                    <section data-id={tab.key}>
                        <h2>{tab.title}</h2>
                        <img src={tab.Image} alt={tab.key} />
                    </section>
                ))}
            </div>

            {/* 吸底按钮 */}
            <div className={classNames(styles.btnWrapper, { [styles.visible]: isFixed })}>
                <img src={LogoImage} alt="LOGO" />

                <a href="https://www.bilibili.com/" target="_blank">
                    <button>App 内打开</button>
                </a>
            </div>
        </div>
    )
}

export default SecondSection