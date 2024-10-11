import db from '../../bannerdb';
import {Banner} from "@/types/Banner";

export const getBanners = () => {
    return db.prepare('SELECT * FROM banner').all() as Banner[];
}