import { CiCircleCheck } from "react-icons/ci";

export default function BookingSuccess() {
    return (
        <div className="text-center flex justify-center flex-col gap-5 py-32">
            <div className="flex justify-center">
                <CiCircleCheck size={76} color="green" />
            </div>
            <h1 className="font-bold text-[#555555] text-3xl">Thank you!</h1>
            <p className="text-[#555555]">
                Yêu cầu của bạn đã được ghi lại, chúng tôi sẽ sớm liên hệ với
                bạn
            </p>

            <div>
                <button className="btn btn-active btn-accent ">Accent</button>
            </div>
            <a className="link link-success" href="/">
                Trở về trang chủ
            </a>
        </div>
    );
}
