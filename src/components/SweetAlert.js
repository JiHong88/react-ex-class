import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import 'sweetalert2/dist/sweetalert2.min.css'

/**
 * @example
 * ReactSwal.fire({
        title: "타이틀",
        text: "내용",
        html: "<pre>HTML 태그를 포함할 수 있는 내용.<br/>abc</pre>",
        icon: "success" | "error" | "warning" | "info" | "question" | undefined,
        showCancelButton: boolean,
        allowOutsideClick: boolean,
        confirmButtonText: "confirm 버튼 텍스트" || "확인",
        cancelButtonText: "cancle" 버튼 텍스트" || "취소"
    }).then(function (result) {
        if (result.value) {
            ReactSwal.fire('Deleted!', 'Your imaginary file has been deleted.', 'success')
        } else {
            ReactSwal.fire('Cancelled', 'Your imaginary file is safe :)', 'error')
        }
    })
 */
const ReactSwal = withReactContent(Swal.mixin({
    buttonsStyling: true,
    customClass: {
        confirmButton: 'btn btn-primary btn-lg',
        cancelButton: 'btn btn-default btn-lg',
        actions: 'text-center'
    },
    confirmButtonText: "확인",
    cancelButtonText: "취소"
}))


export default ReactSwal;