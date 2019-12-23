var config = {
	"version": 14,
	"show_report": "ajax163",
	"click_report": "ajax133",
	"monitor_src": "picmini",
	"details": [{
		"rotation_source": "http:\/\/test.recsys.50bang.org\/api\/pc\/minipage\/newsPlayList\/v1?scenesId=41&businessId=2&category=HOT&pageSize=2&callback=remen_rotation",
		"rotation_type": "personas",
		"rotation_callback": "remen_rotation",
		"rotation_tj_r": "remen_rotation",
		"recommend_contents": [{
			"ads": {
				"url": "https:\/\/show-g.mediav.com\/s?type=1&of=4&newf=1&scheme=https&showid=FCAC5s&impct=1&jsonp=remen_ad_rotation1",
				"type": "360",
				"callback": "remen_ad_rotation1",
				"tj_r": "remen_360_ad_rotation1"
			},
			"origin": {
				"url": "https:\/\/mini.eastday.com\/a\/191203222523915.html?qid=2345mini",
				"title": "\u79bb\u5a5a6\u5e74\u540c\u53f0\u6df1\u60c5\u76f8\u62e5\uff0c\u7834\u955c\u91cd\u5706\u4f20\u95fb\u4e0d\u65ad\uff0c\u4eca\u88ab\u7206\u5df2\u7ecf\u540c\u5c45",
				"pic_url": "\/\/09imgmini.eastday.com\/mobile\/20191203\/20191203222523_218c239fefc902c623a82fc5c075b7e3_2_mwpm_03200403.jpg"
			}
		}, {
			"ads": {
				"type": "baidu",
				"bd_id": "u3510655",
				"tj_r": "remen_baidu_ad_rotation2"
			},
			"origin": {
				"url": "",
				"title": ""
			}
		}, {
			"ads": {
				"url": "https:\/\/show-g.mediav.com\/s?type=1&of=4&newf=1&scheme=https&showid=FCAC5s&impct=1&jsonp=remen_ad_rotation3",
				"type": "360",
				"callback": "remen_ad_rotation3",
				"tj_r": "remen_360_ad_rotation3"
			},
			"origin": {
				"url": "",
				"title": ""
			}
		}, {
			"ads": {
				"type": ""
			},
			"origin": {
				"url": "",
				"title": ""
			}
		}],
		"news_contents": {
			"news_type": "personas",
			"news_src": "http://test.recsys.50bang.org/api/pc/minipage/v2?scenesId=41&businessId=2&category=HOT",
			"news_callback": "remen",
			"news_tj_r": "remen_news",
			"news_fresh_src": "http://test.recsys.50bang.org\/api\/pc\/minipage\/clickGet\/v1?scenesId=41&businessId=2&category=HOT",
			"news_fresh_callback": "remen_news_fresh",
			"news_fresh_tj_r": "remen_news_fresh",
			"news_monitor": {
				"limit": 50,
				"timeout": 3000
			},
			"ads_url": "https:\/\/show-g.mediav.com\/s?type=1&of=4&newf=1&scheme=https&showid=FCAC5s&jsonp=remen_ads&impct=4",
			"ads_type": "360",
			"ads_callback": "remen_ads",
			"ads_tj_r": "remen_ads360",
			"ads_monitor": {
				"limit": 2,
				"timeout": 3000
			},
      "ads_max_fetch_time": 5,
      "news_more_url": 'http://news.2345.com/wuli/'
		},
		"template_type": 1,
		"priority": "1",
		"level": 1,
		"title": "\u70ed\u70b9"
	}, {
		"rotation_source": "http:\/\/test.recsys.50bang.org\/api\/pc\/minipage\/newsPlayList\/v1?scenesId=41&businessId=2&category=SHEHUI&pageSize=2&callback=shehui_rotation",
		"rotation_type": "personas",
		"rotation_callback": "shehui_rotation",
		"rotation_tj_r": "shehui_rotation",
		"recommend_contents": [{
			"ads": {
				"url": "https:\/\/show-g.mediav.com\/s?type=1&of=4&newf=1&scheme=https&showid=FCAC5s&impct=1&jsonp=shehui_ad_rotation1",
				"type": "360",
				"callback": "shehui_ad_rotation1",
				"tj_r": "shehui_360_ad_rotation1"
			},
			"origin": {
				"url": "",
				"title": "",
				"pic_url": ""
			}
		}, {
			"ads": {
				"type": "baidu",
				"bd_id": "u3510655",
				"tj_r": "shehui_baidu_ad_rotation2"
			},
			"origin": {
				"url": "",
				"title": "",
				"pic_url": ""
			}
		}, {
			"ads": {
				"url": "https:\/\/show-g.mediav.com\/s?type=1&of=4&newf=1&scheme=https&showid=FCAC5s&impct=1&jsonp=shehui_ad_rotation3",
				"type": "360",
				"callback": "shehui_ad_rotation3",
				"tj_r": "shehui_360_ad_rotation3"
			},
			"origin": {
				"url": "",
				"title": "",
				"pic_url": ""
			}
		}, {
			"ads": {
				"type": ""
			},
			"origin": {
				"url": "",
				"title": "",
				"pic_url": ""
			}
		}],
		"news_contents": {
			"news_type": "personas",
			"news_src": "http:\/\/test.recsys.50bang.org\/api\/pc\/minipage\/v2?scenesId=41&businessId=2&category=SHEHUI&callback=shehui_news",
			"news_callback": "shehui_news",
			"news_tj_r": "shehui_news",
			"news_fresh_src": "http://test.recsys.50bang.org\/api\/pc\/minipage\/clickGet\/v1?scenesId=41&businessId=2&category=SHEHUI&callback=shehui_news_fresh",
			"news_fresh_callback": "shehui_news_fresh",
			"news_monitor": {
				"limit": 50,
				"timeout": 3000
			},
			"ads_url": "https:\/\/show-g.mediav.com\/s?type=1&of=4&newf=1&scheme=https&showid=FCAC5s&jsonp=shehui_ads&impct=4",
			"ads_type": "360",
			"ads_callback": "shehui_ads",
			"ads_tj_r": "shehui_ads",
			"ads_monitor": {
				"limit": 2,
				"timeout": 3000
			},
			"ads_max_fetch_time": 5
		},
		"template_type": 1,
		"priority": "2",
		"level": 1,
		"title": "\u793e\u4f1a"
	}, {
		"rotation_source": "http:\/\/test.recsys.50bang.org\/api\/pc\/minipage\/newsPlayList\/v1?scenesId=41&businessId=2&category=YULE&pageSize=2&callback=yule_rotation",
		"rotation_type": "personas",
		"rotation_callback": "yule_rotation",
		"rotation_tj_r": "yule_rotation",
		"recommend_contents": [{
			"ads": {
				"url": "https:\/\/show-g.mediav.com\/s?type=1&of=4&newf=1&scheme=https&showid=FCAC5s&impct=1&jsonp=yule_ad_rotation1",
				"type": "360",
				"callback": "yule_ad_rotation1",
				"tj_r": "yule_360_ad_rotation1"
			},
			"origin": {
				"url": "",
				"title": "",
				"pic_url": ""
			}
		}, {
			"ads": {
				"type": "baidu",
				"bd_id": "u3510655",
				"tj_r": "yule_baidu_ad_rotation2"
			},
			"origin": {
				"url": "",
				"title": "",
				"pic_url": ""
			}
		}, {
			"ads": {
				"url": "https:\/\/show-g.mediav.com\/s?type=1&of=4&newf=1&scheme=https&showid=FCAC5s&impct=1&jsonp=yule_ad_rotation3",
				"src": "360",
				"callback": "yule_ad_rotation3",
				"tj_r": "yule_360_ad_rotation3"
			},
			"origin": {
				"url": "",
				"title": "",
				"pic_url": ""
			}
		}, {
			"origin": {
				"url": "",
				"title": "",
				"pic_url": ""
			}
		}],
		"news_contents": {
			"news_type": "personas",
			"news_src": "http:\/\/test.recsys.50bang.org\/api\/pc\/minipage\/v2?scenesId=41&businessId=2&category=YULE&callback=yule_news",
			"news_callback": "yule_news",
			"news_tj_r": "yule_news",
      "news_fresh_src": "http://test.recsys.50bang.org\/api\/pc\/minipage\/clickGet\/v1?scenesId=41&businessId=2&category=YULE&callback=yule_news_fresh",
			"news_fresh_callback": "yule_news_fresh",
			"news_monitor": {
				"limit": 50,
				"timeout": 3000
			},
			"ads_type": "baidu",
			"ads_bd_id": ["u3744281", "u3744328", "u3744281", "u3744338", "u3744281"],
			"ads_tj_r": "ads_yule",
			"ads_monitor": {
				"limit": 2,
				"timeout": 3000
			},
			"ads_max_fetch_time": 5
		},
		"template_type": 1,
		"priority": "3",
		"level": 1,
		"title": "\u5a31\u4e50"
	}]
}

window.config = config