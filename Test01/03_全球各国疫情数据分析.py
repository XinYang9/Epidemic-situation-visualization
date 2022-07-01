# -*- coding = utf-8 -*-
# 创建时间：2022/5/12 16:00
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
    confirm_list = []
    data = pd.read_excel('data/世界数据.xlsx', sheet_name="Sheet1")

    # 选择地区
    for a in data['地区'].unique():
        area_list.append(a)
    # 选择累计确诊
    for c in data['累计确诊'].unique():
        confirm_list.append(c)

    json_dict['area'] = area_list
    json_dict['confirm'] = confirm_list
    # print(json_dict)
    data_dict = json.dumps(json_dict, ensure_ascii=False, cls=NpEncoder)

    with open('data/allWordData.json', 'w', encoding="utf-8") as fp:
        fp.write(data_dict)
    print('全球疫情数据处理完成')
