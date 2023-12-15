import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="[&>div]:flex [&>div]:space-x-4 [&>div]:my-1 [&_p]:text-green-500 text-xl">
        <h1 className="text-4xl font-bold mb-6">リンク集</h1>
      <div>
        <Link href={"/menta/customer"}>customer</Link>
        <p>//顧客を作成</p>
      </div>
      <div>
        <Link href={"/menta/account"}>account</Link>
        <p>//子アカウントを作成</p>
      </div>
      <div>
        <Link href={"/menta/request"}>request</Link>
        <p>//顧客からvtuberにリクエスト</p>
      </div>
      <div>
        <Link href={"/menta/charge"}>charge</Link>
        <p>//リクエストを承認（決済完了）</p>
      </div>
      <div>
        <Link href={"/menta/transfer"}>transfer</Link>
        <p>//子アカウントに送金</p>
      </div>
    </div>
  );
}

export default page;
