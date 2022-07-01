import copy
import json
from matplotlib.font_manager import json_dump
import requests
from yaml import parse


def main(url1, headers1):
    response = requests.get(url=url1, headers=headers1)
    json_d = response.json()
    return json_d

def store(json_data):
    dict = {}
    showTime = []
    tem = []
    do = []
    perc =[]
    ec = []
    salinity = []
    tds = []
    ph = []
    ntu = []
    voltage = []
    for i in range(7668):
        data = json_data[i]
        # 显示时间
        dict['Stime'] = data['Stime'] 
        # 温度
        dict['Temp'] = data['Temp']
        # 溶解氧
        dict['DO'] = data['DO']
        # 溶解氧
        dict['Perc'] = data['Perc']
        # 电导率
        dict['EC'] = data['EC']
        # 盐度
        dict['Salinity'] = data['Salinity']
        # 溶解性固总量
        dict['TDS'] = data['TDS']
        # pH
        dict['pH'] = data['pH']
        # 浊度
        dict['NTU'] = data['NTU']
        # 电压
        dict['Voltage'] = data['Voltage']
        data_list = []
        data_list.append(copy.deepcopy(dict))
    with open('data.json','w') as f:
        data = json.dumps(data_list)
        f.read(data)

if __name__ == "__main__":
    url = 'http://47.93.193.119/water/Service1.asmx/selectAllInfor'  # 请求URL
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.53 Safari/537.36 Edg/103.0.1264.37'}  # 浏览器访问
    json_data = main(url, headers)
    store(json_data)
