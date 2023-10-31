import { Session } from "/@/utils/storage";

export default function useState(state, storageKey: string) {
    // 同步state和storage数据，填写应聘表有ABCDE几个页面，每个页面下一步都要先保存一份数据，同一个手机号可以填写多份应聘表
    const applyInfomation = Session.get('_gok_apply_job')
    const storageInfomation = Session.get(storageKey)

    const mergeDefaultOptions = (options, props) => {
        for (const key in options) {
            if (!Object.getOwnPropertyDescriptor(props, key)) {
                props[key] = options[key];
            }
        }
        return props;
    };

    // 先合并页面的
    let mergeState = storageInfomation ? mergeDefaultOptions(storageInfomation, state) : state
    // 在合并数据回显的
    mergeState = applyInfomation ? mergeDefaultOptions(applyInfomation, mergeState) : mergeState
    
    return mergeState
}