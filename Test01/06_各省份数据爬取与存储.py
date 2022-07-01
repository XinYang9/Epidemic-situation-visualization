import copy
import json
import re

import requests  # 爬取网页
from lxml import etree


# 数据爬取
def main(url1, headers1):
    response = requests.get(url=url1, headers=headers1).content
    tree = etree.HTML(response)
    p = tree.xpath('//script[@id="getAreaStat"]/text()')
    f = open("data/疫情数据.txt", "w", encoding="utf-8")
    f.write(str(p))
    f.close()


#  数据预处理
def get_json():
    f = open("data/疫情数据.txt", "r", encoding="utf-8")
    f_content = f.read()
    f.close()
    json_start = "try { window.getAreaStat = "
    json_end = "}catch\(e\){}"
    regular_key = json_start + "(.*?)" + json_end
    re_content = re.search(regular_key, f_content, re.S)
    content = re_content.group()
    # 去除json字符串的前后关键词
    content = content.replace(json_start, '')
    # 尾巴要去掉转义符号
    json_end = "}catch(e){}"
    content = content.replace(json_end, '')
    # 打印结果
    # print(content)
    return content


# 数据存储
def storage(json_contents):
    # 将字符串转化为字典
    json_data = json.loads(json_contents)
    # 省份数据展示
    # print(json_data)
    json_dict = {}
    json_list = []

    for i in json_data:
        json_dict['name'] = i["provinceShortName"]
        json_dict['value'] = str(i["currentConfirmedCount"])
        # print(json_dict)
        # 使用deepcopy进行深度拷贝，否则列表里的值为相同值
        json_list.append(copy.deepcopy(json_dict))
    # print(json_list)

    data_dict = json.dumps(json_list, ensure_ascii=False)
    with open('data/provinceData.json', 'w', encoding="utf-8") as fp:
        fp.write(data_dict)


if __name__ == "__main__":
    url = 'https://ncov.dxy.cn/ncovh5/view/pneumonia'  # 请求URL
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.55'
    }  # 浏览器访问
    main(url, headers)
    json_content = get_json()
    # print(json_content)
    storage(json_content)
    # print(fjson_data)

    print('各省份数据处理完成')
