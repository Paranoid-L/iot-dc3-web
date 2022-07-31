/*
 * Copyright (c) 2022. Pnoker. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { defineComponent, reactive, ref, unref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { Plus, RefreshRight, Search, Refresh } from '@element-plus/icons-vue'

import { Dictionary } from '@/config/type/types'

export default defineComponent({
    name: 'PointValueTool',
    props: {
        deviceDictionary: {
            type: Array<Dictionary>,
            default: () => {
                return []
            },
        },
        pointDictionary: {
            type: Array<Dictionary>,
            default: () => {
                return []
            },
        },
        page: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    emits: ['search', 'reset', 'refresh', 'size-change', 'current-change'],
    setup(props, { emit }) {
        // 定义表单引用
        const formDataRef = ref<FormInstance>()

        // 定义响应式数据
        const reactiveData = reactive({
            formData: {} as any,
        })

        // 定义表单校验规则
        const formRule = reactive<FormRules>({})

        // 图标
        const Icon = {
            Plus,
            RefreshRight,
            Search,
            Refresh,
        }

        const search = () => {
            const form = unref(formDataRef)
            form?.validate((valid) => {
                if (valid) {
                    const formData = {} as any
                    const data = reactiveData.formData
                    if (data.deviceId && data.deviceId[1]) {
                        formData.deviceId = data.deviceId[1]
                    }
                    if (data.pointId && data.pointId[1]) {
                        formData.pointId = data.pointId[1]
                    }
                    emit('search', formData)
                }
            })
        }
        const reset = () => {
            const form = unref(formDataRef)
            form?.resetFields()
            emit('reset')
        }
        const refresh = () => {
            emit('refresh')
        }
        const sizeChange = (size) => {
            emit('size-change', size)
        }
        const currentChange = (current) => {
            emit('current-change', current)
        }

        return {
            formDataRef,
            reactiveData,
            formRule,
            search,
            reset,
            refresh,
            sizeChange,
            currentChange,
            ...Icon,
        }
    },
})
