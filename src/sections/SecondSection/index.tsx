import {FC, useState} from "react";
import CartoonImage from '../../assets/cartoon.jpg'
import MovieImage from '../../assets/movie.png'
import LifeImage from '../../assets/life.jpg'
import FoodImage from '../../assets/food.jpg'

import styles from "./styles.module.scss"
import classNames from "classnames";

const SecondSection:FC = () => {
    /**
     * @param tabs[string]
     */
    const tabs = [
        {
            key: 'cartoon',
            title: '动画',
        },
        {
            key: 'food',
            title: '美食',
        },
        {
            key: 'movie',
            title: '电影',
        },
        {
            key: 'life',
            title: '生活',
        }
    ]

    const  [ activeTab, setActiveTab ] = useState('cartoon')

  return(
      <div className={styles.secondSection}>
          {/*  这里我们 activeTab 单独的抽出来，我们写成数组的形式,然后进行在页面给上渲染  */}
          <ul>
              { tabs.map(tab => (
                  <li key={ tab.key } onClick={() => setActiveTab(tab.key)}>
                      <span>{ tab.title }</span>
                      {/*  下划线line  */}
                      <span className={ classNames(styles.line, {[ styles.visible ]: activeTab === tab.key}) }/>
                  </li>
              ))}

          </ul>
          {/*Tab + Content*/}
          <div>
              <section>
                  <h2>动画</h2>
                  <img src={CartoonImage} alt="Cartoon"/>
              </section>
              <section>
                  <h2>美食</h2>
                  <img src={ FoodImage } alt=""/>
              </section>
              <section>
                  <h2>电影</h2>
                  <img src={ MovieImage } alt=""/>
              </section>
              <section>
                  <h2>生活</h2>
                  <img src={ LifeImage } alt=""/>
              </section>
          </div>
      </div>
  )
}

export default SecondSection