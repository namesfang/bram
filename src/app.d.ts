import type Session from "$lib/server/session"

declare global {

	// 登录者信息
	type User = {
		id: number
		name: string
		nick: string
		isAdm: boolean
		createdAt: string
	}

	// 配置项
	type Configuration = {
		siteName: string
		siteICPString: string
		securityLoginEnabled: string
		securitySignupEnabled: string
	}

	// 字典
	type DictOption = {
    value: string
    label: string
  }
	// 字典
	type DictMap = {
		[name: string]: {
			[value: string]: string | DictOption[]
			children: DictOption[]
		}
	}

	// 主导航
	type Nav = {
    label: string,
    icon: IconName,
    href: string,
		active: boolean
    target?: '_blank'
  }

	// namespace globalThis {
	// 	interface Window {
	// 		BMAP_PROTOCOL: string;
	// 		BMapGL_loadScriptTime: number;
	// 	}
	// }
	
	namespace App {

		// interface Error {}
		interface Locals {
			dict: DictMap
			configuration: Configuration
			user: User
			session: Session
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
