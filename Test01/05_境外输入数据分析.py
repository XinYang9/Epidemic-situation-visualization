# -*- coding = utf-8 -*-
# 创建时间：2022/5/11 17:16
import json
from datetime import date, datetime

import numpy as np
import pandas as pd


# json序列化报错
class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        elif isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        elif isinstance(obj, np.datetime64):  # 这里解决题目上报错
            return str(obj)[:10]
        else:
            return super(NpEncoder, self).default(obj)


if __name__ == '__main__':
    json_dict = {}
    json_dict0 = {}
    date_list = []
    today_list = []
    confirm_list = []
    new_list = []
    con_list = []
    data = pd.read_excel('data/国内疫情数据.xlsx', sheet_name="Sheet1")
    # 获取日期
    for a in data['日期'].unique():
        date_list.append(a)
    # 获取日境外
    for t in data['日境外']:
        today_list.append(t)
    # 获取日境外
    for c in data['累计境外'].unique():
        confirm_list.append(c)
    json_dict['date'] = date_list
    json_dict['today'] = today_list
    json_dict['confirm'] = confirm_list
    # print(json_dict)
    data_dict = json.dumps(json_dict, ensure_ascii=False, cls=NpEncoder)
    with open('data/inputData.json', 'w', encoding="utf-8") as fp:
        fp.write(data_dict)
    print('境外输入疫情数据处理完成')
    # 获取新增确诊
    for t in data['新增确诊']:
        new_list.append(t)
    # 获取累计确诊
    for c in data['累计确诊'].unique():
        con_list.append(c)
    json_dict0['date'] = date_list
    json_dict0['today'] = new_list
    json_dict0['confirm'] = con_list
    data_dict0 = json.dumps(json_dict0, ensure_ascii=False, cls=NpEncoder)
    with open('data/chinaData.json', 'w', encoding="utf-8") as fp:
        fp.write(data_dict0)
    print('国内疫情数据处理完成')
