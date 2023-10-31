import axios from 'axios';

/**
 * 创建并配置一个 Axios 实例对象
 */
const service = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 50000, // 全局超时时间
	headers: {
		'Content-Type': 'application/json',
	},
});

/**
 * Axios请求拦截器，对请求进行处理
 * 1. 序列化get请求参数
 * 2. 统一增加Authorization和TENANT-ID请求头
 * 3. 自动适配单体、微服务架构不同的URL
 * @param config AxiosRequestConfig对象，包含请求配置信息
 */
service.interceptors.request.use(
	(config) => {
		if (config.namespace === '/mock') {
			config.baseURL = '/mock';
		}
		if (config.scope === '/mock') {
			config.baseURL = '/mockapi';
		}

		// 对get请求参数进行序列化
		if (config.method === 'get') {
			// @ts-ignore 使用qs库来序列化查询参数
			config.paramsSerializer = (params) => {
				return qs.stringify(params, { arrayFormat: 'repeat' });
			};
		}


		// 处理完毕，返回config对象
		return config;
	},
	(error) => {
		// 对请求错误进行处理
		return Promise.reject(error);
	}
);



/**
 * 添加 Axios 的响应拦截器，用于全局响应结果处理
 */
service.interceptors.response.use(
	/**
	 * 响应拦截器处理函数
	 * @param response 响应结果
	 * @returns 如果响应成功，则返回响应的data属性；否则，抛出错误或者执行其他操作
	 */
	(response) => {

		if (response.data.code === 1) {
			throw response.data;
		}


		return response.data;
	}, (error) => {
		const status = Number(error.response.status) || 200;
		if (status === 424) {

		}
		return Promise.reject(error.response.data);
	});


// 导出 axios 实例
export default service;
