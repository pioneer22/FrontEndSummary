/* 冒泡排序 */
function bubbleSort(arr, sortType = 1) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let flag = false; // 提前退出循环标识
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                flag = true;
            }
        }
        if (!flag) break;
    }
    return sortType === 1 ? arr : arr.reverse();
}

/* 选择排序 */
function selectionSort(arr, sortType = 1) {
    let len = arr.length, minIndex;
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i; j < len; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (i !== minIndex)
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
    return sortType === 1 ? arr : arr.reverse();
}

/* 归并排序 */
function mergeSort(arr, sortType = 1) {
    let array = mergeSortRec(arr);
    return sortType === 1 ? array : array.reverse();
}

/*
    若分裂数组长度不为1, 继续分裂
    合并最小数组
*/
function mergeSortRec(arr) {
    let len = arr.length;
    if (arr.length === 1) {
        return arr;
    }
    let mid = Math.floor(len / 2),
        left = arr.slice(0, mid),
        right = arr.slice(mid, len);
    return merge(mergeSort(left), mergeSort(right));
}

/* 顺序合并left, right到result */
function merge(left, right) {
    let result = [],
        ileft = 0,
        iright = 0;
    while (ileft < left.length && iright < right.length) {
        if (left[ileft] < right[iright]) {
            result.push(left[ileft++])
        } else {
            result.push(right[iright++])
        }
    }
    if (ileft < left.length) {
        result = result.concat(left.slice(ileft))
    }
    if (iright < right.length) {
        result = result.concat(right.slice(iright))
    }
    return result;
}

/* 快速排序 */
const quickSort = (arr) => quick(arr, 0, arr.length - 1);

const quick = (arr, left, right) => {
    let index;
    if (left < right) {
        // 划分数组
        index = partition(arr, left, right);
        if (left < index - 1) {
            quick(arr, left, index - 1);
        }
        if (index < right) {
            quick(arr, index, right);
        }
    }
    return arr;
}

const partition = (arr, left, right) => {
    // 取中间项为基准
    let temp = arr[Math.floor(Math.random() * (right - left + 1)) + left],
        i = left,
        j = right;

    //  开始调整
    while (i <= j) {
        // 左指针右移
        while (arr[i] < temp) {
            i++;
        }
        // 右指针左移
        while (arr[j] > temp) {
            j--;
        }

        if (i <= j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
            j--;
        }
    }
    return i;
}

/* 插入排序 */
function insertionSoft(arr, sortType = 1) {
    let len = arr.length;
    let preIndex, current;

    for (let i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return sortType === 1 ? arr : arr.reverse();
}