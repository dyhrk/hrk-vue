const localCache = {
	// 查看 v2.4.3版本更新日志
	setKey(key) {
		return `${__NEXT_NAME__}:${key}`;
	},
	// 设置永久缓存
	set(key, val) {
		localStorage.setItem(localCache.setKey(key), JSON.stringify(val));
	},
	// 获取永久缓存
	get(key) {
		let json = localStorage.getItem(localCache.setKey(key));
		return JSON.parse(json);
	},
	// 移除永久缓存
	remove(key) {
		localStorage.removeItem(localCache.setKey(key));
	},
	// 移除全部永久缓存
	clear() {
		localStorage.clear();
	},
};
const sessionCache = {
	// 设置临时缓存
	set(key, val) {
		sessionStorage.setItem(localCache.setKey(key), JSON.stringify(val));
	},
	// 获取临时缓存
	get(key) {
		let json = sessionStorage.getItem(localCache.setKey(key));
		return JSON.parse(json);
	},
	// 移除临时缓存
	remove(key) {
		sessionStorage.removeItem(localCache.setKey(key));
	},
	getJSON(key) {
		const value = this.get(key)
		if (value != null) {
			return JSON.parse(value)
		}
	},
	setJSON(key, jsonValue) {
		if (jsonValue != null) {
			this.set(key, JSON.stringify(jsonValue))
		}
	},
	// 移除全部临时缓存
	clear() {
		sessionStorage.clear();
	},
};
export default {
	/**
	 * 会话级缓存
	 */
	Session: sessionCache,
	/**
	 * 本地缓存
	 */
	local: localCache
}
