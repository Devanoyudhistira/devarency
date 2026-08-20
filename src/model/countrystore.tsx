import { create } from "zustand";
import axios from "axios";

type Country = {
  names: {
    common: string;
    official: string;
  };

  codes: {
    alpha_2: string;
    alpha_3: string;
  };

  flag: {
    emoji: string;
    url_png: string;
    url_svg: string;
  };

  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];

  region: string;
  subregion: string;
};

type CountryResponse = {
  data: {
    objects: Country[];
  };
};


type CountryStore = {
  countries: Country[];
  loading: boolean;
  error: string | null;
  getCountries: () => Promise<void>;
};

export const useCountryStore = create<CountryStore>((set) => ({
  countries: [],
  loading: false,
  error: null,

  getCountries: async () => {
    set({ loading: true, error: null });

    try {
      const response = await axios.get<CountryResponse>(
        "https://api.restcountries.com/countries/v5",
        {
          headers: {
            Authorization: import.meta.env.VITE_EXCHANGE_COUNTRY_KEY,
          },
        },
      );

      set({
        countries: response.data.data.objects,
        loading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        error: "Failed to fetch countries",
        loading: false,
      });
    }
  },
}));