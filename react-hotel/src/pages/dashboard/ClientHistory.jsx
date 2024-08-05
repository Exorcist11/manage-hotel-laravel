import axios from "axios";
import { useState, useEffect } from "react";
import { MdDelete, MdCreate, MdOutlineDrafts } from "react-icons/md";

export default function ClientHistory() {
    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl uppercase text-center font-bold">
                Lịch sử phòng đặt
            </h1>
            <div>
                <label className="input input-bordered flex items-center gap-2">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Tìm kiếm tên khách hàng"
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70"
                    >
                        <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </label>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tên khách hàng</th>
                            <th>Phòng</th>
                            <th>Ngày nhận phòng</th>
                            <th>Ngày trả phòng</th>

                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Littel, Schaden and Vandervort</td>
                            <td>Canada</td>

                            <td>Blue</td>
                        </tr>
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Desktop Support Technician</td>
                            <td>Zemlak, Daniel and Leannon</td>
                            <td>United States</td>

                            <td>Purple</td>
                        </tr>
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Tax Accountant</td>
                            <td>Carroll Group</td>
                            <td>China</td>

                            <td>Red</td>
                        </tr>
                        <tr>
                            <th>4</th>
                            <td>Marjy Ferencz</td>
                            <td>Office Assistant I</td>
                            <td>Rowe-Schoen</td>
                            <td>Russia</td>

                            <td>Crimson</td>
                        </tr>
                        <tr>
                            <th>5</th>
                            <td>Yancy Tear</td>
                            <td>Community Outreach Specialist</td>
                            <td>Wyman-Ledner</td>
                            <td>Brazil</td>

                            <td>Indigo</td>
                        </tr>
                        <tr>
                            <th>6</th>
                            <td>Irma Vasilik</td>
                            <td>Editor</td>
                            <td>Wiza, Bins and Emard</td>
                            <td>Venezuela</td>

                            <td>Purple</td>
                        </tr>
                        <tr>
                            <th>7</th>
                            <td>Meghann Durtnal</td>
                            <td>Staff Accountant IV</td>
                            <td>Schuster-Schimmel</td>
                            <td>Philippines</td>

                            <td>Yellow</td>
                        </tr>
                        <tr>
                            <th>8</th>
                            <td>Sammy Seston</td>
                            <td>Accountant I</td>
                            <td>O'Hara, Welch and Keebler</td>
                            <td>Indonesia</td>

                            <td>Crimson</td>
                        </tr>
                        <tr>
                            <th>9</th>
                            <td>Lesya Tinham</td>
                            <td>Safety Technician IV</td>
                            <td>Turner-Kuhlman</td>
                            <td>Philippines</td>

                            <td>Maroon</td>
                        </tr>
                        <tr>
                            <th>10</th>
                            <td>Zaneta Tewkesbury</td>
                            <td>VP Marketing</td>
                            <td>Sauer LLC</td>
                            <td>Chad</td>

                            <td>Green</td>
                        </tr>
                        <tr>
                            <th>11</th>
                            <td>Andy Tipple</td>
                            <td>Librarian</td>
                            <td>Hilpert Group</td>
                            <td>Poland</td>

                            <td>Indigo</td>
                        </tr>
                        <tr>
                            <th>12</th>
                            <td>Sophi Biles</td>
                            <td>Recruiting Manager</td>
                            <td>Gutmann Inc</td>
                            <td>Indonesia</td>

                            <td>Maroon</td>
                        </tr>
                        <tr>
                            <th>13</th>
                            <td>Florida Garces</td>
                            <td>Web Developer IV</td>
                            <td>Gaylord, Pacocha and Baumbach</td>
                            <td>Poland</td>

                            <td>Purple</td>
                        </tr>
                        <tr>
                            <th>14</th>
                            <td>Maribeth Popping</td>
                            <td>Analyst Programmer</td>
                            <td>Deckow-Pouros</td>
                            <td>Portugal</td>

                            <td>Aquamarine</td>
                        </tr>
                        <tr>
                            <th>15</th>
                            <td>Moritz Dryburgh</td>
                            <td>Dental Hygienist</td>
                            <td>Schiller, Cole and Hackett</td>
                            <td>Sri Lanka</td>

                            <td>Crimson</td>
                        </tr>
                        <tr>
                            <th>16</th>
                            <td>Reid Semiras</td>
                            <td>Teacher</td>
                            <td>Sporer, Sipes and Rogahn</td>
                            <td>Poland</td>

                            <td>Green</td>
                        </tr>
                        <tr>
                            <th>17</th>
                            <td>Alec Lethby</td>
                            <td>Teacher</td>
                            <td>Reichel, Glover and Hamill</td>
                            <td>China</td>

                            <td>Khaki</td>
                        </tr>
                        <tr>
                            <th>18</th>
                            <td>Aland Wilber</td>
                            <td>Quality Control Specialist</td>
                            <td>Kshlerin, Rogahn and Swaniawski</td>
                            <td>Czech Republic</td>

                            <td>Purple</td>
                        </tr>
                        <tr>
                            <th>19</th>
                            <td>Teddie Duerden</td>
                            <td>Staff Accountant III</td>
                            <td>Pouros, Ullrich and Windler</td>
                            <td>France</td>

                            <td>Aquamarine</td>
                        </tr>
                        <tr>
                            <th>20</th>
                            <td>Lorelei Blackstone</td>
                            <td>Data Coordiator</td>
                            <td>Witting, Kutch and Greenfelder</td>
                            <td>Kazakhstan</td>

                            <td>Red</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>company</th>
                            <th>location</th>

                            <th>Favorite Color</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
