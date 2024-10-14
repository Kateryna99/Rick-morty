import { PlanetSlider } from "@/components/sliders/PlanetSlider/PlanetSlider";
import { BannerSlider } from "@/components/sliders/BannerSlider/BannerSlider";
import Link from "next/link";
import Loader from "@/components/loader/Loader";
import { ProgressSpeed, ProgressStart, ProgressValue } from "@/enums/Loader";
import { Planet } from "@/types/Planet";
import { getPlanets } from "@/lib/planets";
import { getBanners } from "@/lib/banner";

import styles from "./HomePage.module.scss";
import classNames from "classnames";

export const HomePage = () => {
  const planets: Planet[] = getPlanets();
  const bannerList = getBanners();

  return (
    <div className={styles.grid}>
      <div className={styles.gridWrapper}>
        <div className={classNames(styles.gridItem)} />

        <div className={classNames(styles.gridItem, styles.transformRight)}>
          <PlanetSlider planetSliders={planets} />
        </div>

        <div className={classNames(styles.gridItem)}>
          <BannerSlider bannerList={bannerList} />
        </div>

        <Link
          href="https://www.netflix.com/at-en/title/80014749"
          target="_blank"
          className={classNames(
            styles.gridItem,
            styles.transformRight,
            styles.announce,
          )}
        >
          <div className={styles.announceWrapper}>
            <div className={styles.announceHeader}>
              <Loader
                progressValue={ProgressValue.announceDate}
                progressSpeed={ProgressSpeed.announceDate}
                progressStart={ProgressStart.announceDate}
              />
              <p className={styles.announceMonth}>November</p>
            </div>

            <main className={styles.announceMain}>
              <p className={styles.announceText}>New episode is available on</p>
              <span
                className={classNames(styles.announceIcon, "icon-netflix_logo")}
              />
            </main>
          </div>
        </Link>
      </div>
    </div>
  );
};
