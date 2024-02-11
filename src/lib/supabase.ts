import "react-native-url-polyfill/auto";
import { MMKV } from "react-native-mmkv";
import { createClient } from "@supabase/supabase-js";

import { config } from "./config";
import { Database } from "./database.types";

export const storage = new MMKV();

const authStorage = {
	setItem: (key: string, value: string) => storage.set(key, value),
	getItem: (key: string) => storage.getString(key) ?? null,
	removeItem: (key: string) => storage.delete(key),
};

export const supabase = createClient<Database>(
	config.supabaseUrl,
	config.supabaseAnonKey,
	{
		auth: {
			storage: authStorage,
		},
	},
);
