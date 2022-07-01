import json  # json文件可以通过角标索引读取内容 爬取json文件

import requests  # 爬取网页
import xlwings  # 导入excel


def main(url1, headers1):
    response = requests.get(url=url1, headers=headers1)
    json_d = response.json()['data']['chinaDayList']
    # print(json_d)
    return json_d


def storage(json_data1):
    exc = xlwings.Book('data/国内疫情数据.xlsx')  # 相当于打开excel操作
    sht = exc.sheets('sheet1')  # 相当于在excel里加了一个工作表
    sht.range('A1').value = '日期'
    sht.range('B1').value = '新增确诊'
    sht.range('C1').value = '日境外'
    sht.range('D1').value = '累计确诊'
    sht.range('E1').value = '累计境外'
    for i in range(60):
        earth_data = json_data1[i]
        # print(earth_data)
        date = earth_data['date']
        sht.range(f'A{i + 2}').value = date
        today_confirm = json.dumps(earth_data['today']['confirm'])
        sht.range(f'B{i + 2}').value = today_confirm
        today_input = json.dumps(earth_data['today']['input'])
        sht.range(f'C{i + 2}').value = today_input
        total_confirm = json.dumps(earth_data['total']['confirm'])
        sht.range(f'D{i + 2}').value = total_confirm
        total_input = json.dumps(earth_data['total']['input'])
        sht.range(f'E{i + 2}').value = total_input
    exc.save()


if __name__ == "__main__":
    url = 'https://c.m.163.com/ug/api/wuhan/app/data/list-total?t=330395169065'  # 请求URL
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.55'}  # 浏览器访问
    json_data = main(url, headers)
    # print(json_data)
    storage(json_data)
    print('国内数据爬取完成')
