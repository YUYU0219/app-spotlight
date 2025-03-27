import axios from 'axios';

const BASE_URL = 'https://itunes.apple.com/tw';

export interface AppResponse {
  id: string;
  name: string;
  summary: string;
  image: string;
  category: string;
  price: string;
  title: string;
}

export const api = {
  // 獲取免費應用列表
  getFreeApps: async (limit: number = 100): Promise<AppResponse[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/rss/topfreeapplications/limit=${limit}/json`);
      return response.data.feed.entry.map((entry: any) => ({
        id: entry.id.attributes['im:id'],
        name: entry['im:name'].label,
        summary: entry.summary.label,
        image: entry['im:image'][2].label,
        category: entry.category.attributes.label,
        price: entry['im:price'].label,
        title: entry.title.label,
      }));
    } catch (error) {
      console.error('Error fetching free apps:', error);
      throw error;
    }
  },

  // 獲取推薦應用列表
  getRecommendedApps: async (limit: number = 10): Promise<AppResponse[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/rss/topgrossingapplications/limit=${limit}/json`);
      return response.data.feed.entry.map((entry: any) => ({
        id: entry.id.attributes['im:id'],
        name: entry['im:name'].label,
        summary: entry.summary.label,
        image: entry['im:image'][2].label,
        category: entry.category.attributes.label,
        price: entry['im:price'].label,
        title: entry.title.label,
      }));
    } catch (error) {
      console.error('Error fetching recommended apps:', error);
      throw error;
    }
  },

  // 獲取應用詳情
  getAppDetails: async (appId: string): Promise<AppResponse> => {
    try {
      const response = await axios.get(`${BASE_URL}/lookup?id=${appId}`);
      const app = response.data.results[0];
      return {
        id: app.trackId.toString(),
        name: app.trackName,
        summary: app.description,
        image: app.artworkUrl512,
        category: app.primaryGenreName,
        price: app.formattedPrice,
        title: app.trackName,
      };
    } catch (error) {
      console.error('Error fetching app details:', error);
      throw error;
    }
  },
}; 