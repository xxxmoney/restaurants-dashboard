import {restaurantEnum} from "../../../shared/enums/restaurant.enum";

export async function handleRefreshCache(env: any): Promise<void> {
    // Refresh cache for all restaurant menus
    for (const key of Object.values(restaurantEnum)) {
        
    }
}
