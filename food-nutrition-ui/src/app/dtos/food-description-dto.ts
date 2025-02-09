export interface Photo {
    thumb: string;
}

export interface FoodItem {
    food_name: string;
    tag_id: string;
    serving_unit: string;
    serving_qty: number;
    // common_type: string | null;
    tag_name: string;
    // locale: string;
    photo?: Photo;
    nf_calories: number;
}
