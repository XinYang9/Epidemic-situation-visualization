# -*- coding = utf-8 -*-
# 创建时间：2022/5/12 15:25
import json

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
        else:
            return super(NpEncoder, self).default(obj)


if __name__ == '__main__':
    json_dict = {}
    area_list = []
    new_confirm_list = []
    cure_list = []
    total_list = []
    data = pd.read_excel('data/世界数据.xlsx', sheet_name="Sheet1")
    data.sort_values(by='新增确诊', inplace=True, ascending=False)
    Top10 = data.head(10)
    # print(Top10)
    Top10.to_excel('data/Top10数据.xlsx', index=0)

    data = pd.read_excel('data/Top10数据.xlsx', sheet_name="Sheet1")
    # 选择地区
    for a in data['地区'].unique():
        area_list.append(a)
    # 选择新增确诊
    for c in data['新增确诊']:
        new_confirm_list.append(c)

    # for total in data['累计确诊']:
    #     total_list.append(total)
    # for cure in data['治愈率']:
    #     cure_list.append(cure*100)
    json_dict['area'] = area_list
    json_dict['confirm'] = new_confirm_list
    # json_dict['total'] = total_list
    # json_dict['cure'] = cure_list
    # print(json_dict)
    data_dict = json.dumps(json_dict, ensure_ascii=False, cls=NpEncoder)
    with open('data/Top10Data.json', 'w', encoding="utf-8") as fp:
        fp.write(data_dict)
    print('Top10疫情数据处理完成')
