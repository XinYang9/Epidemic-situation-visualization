# -*- coding = utf-8 -*-
# 创建时间：2022/5/8 10:05
import json  # json文件可以通过角标索引读取内容 爬取json文件

import requests  # 爬取网页
import xlwings  # 导入excel


def main(url1, headers1):
    response = requests.get(url=url1, headers=headers1)
    json_d = response.json()['data']['areaTree']
    # print(json_d)
    return json_d


def storage(json_data1):
    # 打开一个excel
    exc = xlwings.Book('data/世界数据.xlsx')
    # 在excel中创建工作表
    sht = exc.sheets('sheet1')
    # 添加列名
    sht.range('A1').value = '地区'
    sht.range('B1').value = '新增确诊'
    sht.range('C1').value = '累计确诊'
    sht.range('D1').value = '死亡'
    sht.range('E1').value = '治愈'
    sht.range('F1').value = '日期'
    # 数据存放
    for i in range(206):
        earth_data = json_data1[i]
        # print(earth_data)
        name = earth_data['name']
        sht.range(f'A{i + 2}').value = name
        today_confirm = json.dumps(earth_data['today']['confirm'])
        sht.range(f'B{i + 2}').value = today_confirm
        total_confirm = json.dumps(earth_data['total']['confirm'])
        sht.range(f'C{i + 2}').value = total_confirm
        total_dead = json.dumps(earth_data['total']['dead'])
        sht.range(f'D{i + 2}').value = total_dead
        total_heal = json.dumps(earth_data['total']['heal'])
        sht.range(f'E{i + 2}').value = total_heal
        date = earth_data['lastUpdateTime']
        sht.range(f'F{i + 2}').value = date
    exc.save()


if __name__ == "__main__":
    url = 'https://c.m.163.com/ug/api/wuhan/app/data/list-total?t=330395169065'  # 请求URL
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.55'}  # 浏览器访问
    json_data = main(url, headers)
    storage(json_data)
    print('全球疫情数据爬取完成')
