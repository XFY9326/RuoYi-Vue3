<template>
    <el-col :class="className" :span="element.span" @click.stop="activeItem(element)">
        <el-form-item
            v-if="element.layout === 'colFormItem'"
            :label="element.label"
            :label-width="element.labelWidth ? element.labelWidth + 'px' : null"
            :required="element.required"
        >
            <render :key="element.tag" v-model="element.defaultValue" :conf="element" />
        </el-form-item>
        <el-row v-else :class="element.class" :gutter="element.gutter" @click.stop="activeItem(element)">
            <span class="component-name"> {{ element.componentName }} </span>
            <draggable
                ref="draggableItemRef"
                :animation="340"
                :component-data="getComponentData()"
                :list="element.children"
                class="drag-wrapper"
                group="componentsGroup"
                item-key="label"
            >
                <template #item="scoped">
                    <draggable-item
                        :key="scoped.element.renderKey"
                        :active-id="activeId"
                        :drawing-list="element.children"
                        :element="scoped.element"
                        :form-conf="formConf"
                        :index="index"
                        @activeItem="activeItem(scoped.element)"
                        @copyItem="copyItem(scoped.element, element.children)"
                        @deleteItem="deleteItem(scoped.index, element.children)"
                    />
                </template>
            </draggable>
        </el-row>
        <span class="drawing-item-copy" title="复制" @click.stop="copyItem(element)">
            <el-icon>
                <CopyDocument />
            </el-icon>
        </span>
        <span class="drawing-item-delete" title="删除" @click.stop="deleteItem(index)">
            <el-icon>
                <Delete />
            </el-icon>
        </span>
    </el-col>
</template>
<script name="DraggableItem" setup>
import draggable from "vuedraggable";
import render from "@/utils/generator/render";
import { CopyDocument, Delete } from "@element-plus/icons-vue";

const props = defineProps({
    element: Object,
    index: Number,
    drawingList: Array,
    activeId: {
        type: [String, Number],
    },
    formConf: Object,
});
const className = ref("");
const draggableItemRef = ref(null);
const emits = defineEmits(["activeItem", "copyItem", "deleteItem"]);

function activeItem(item) {
    emits("activeItem", item);
}

function copyItem(item, parent) {
    emits("copyItem", item, parent ?? props.drawingList);
}

function deleteItem(item, parent) {
    emits("deleteItem", item, parent ?? props.drawingList);
}

function getComponentData() {
    return {
        gutter: props.element.gutter,
        justify: props.element.justify,
        align: props.element.align,
    };
}

watch(
    () => props.activeId,
    val => {
        className.value =
            (props.element.layout === "rowFormItem" ? "drawing-row-item" : "drawing-item") +
            (val === props.element.formId ? " active-from-item" : "");
        if (props.formConf.unFocusedComponentBorder) {
            className.value += " unfocus-bordered";
        }
    },
    {
        immediate: true,
    }
);
</script>
