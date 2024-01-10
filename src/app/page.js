'use client'
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faBars, faBolt, faCircle, faCircleCheck, faCircleXmark, faClose, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image'
export default function Home() {

  const [rotationDeg, setRotationDeg] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState('');
  const [strongPassword, setStrongPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(0);
  const [passwordHasNumber, setPasswordHasNumber] = useState(false);
  const [passwordHasLetter, setPasswordHasLetter] = useState(false);
  const [startedTypingPassword, setStartedTypingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    setPasswordLength(password.length);
    setPasswordHasNumber(/\d/.test(password));
    setPasswordHasLetter(/[a-zA-Z]/.test(password));
  }, [password]);

  useEffect(() => {
    setPasswordLength(password.length);
    setPasswordHasNumber(/\d/.test(password));
    setPasswordHasLetter(/[a-zA-Z]/.test(password));
  }, [password]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setStartedTypingPassword(true);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (passwordLength < 8) {
      setPasswordFeedback('Precisa ter no mínimo 8 caracteres.');
      setStrongPassword(false);
    } else if (passwordLength >= 8 && !passwordHasNumber) {
      setPasswordFeedback('Precisa ter no mínimo um número.');
      setStrongPassword(false);
    } else if (passwordLength >= 8 && passwordHasNumber && !passwordHasLetter) {
      setPasswordFeedback('Precisa ter no mínimo uma letra.');
      setStrongPassword(false);
    } else {
      setPasswordFeedback('Perfeito!');
      setStrongPassword(true);
    }
  }, [passwordLength, passwordHasNumber, passwordHasLetter]);

  useEffect(() => {
    const handleScroll = () => setRotationDeg(window.scrollY * 0.01);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }
  );

  useEffect(() => {
    if (showMenu || showCreateAccount) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showMenu, showCreateAccount]);

  const sec01Ref = useRef(null);

  function scrollDown() {
    if (sec01Ref.current) {
      sec01Ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }


  return (
    <main className="md:px-28 customShadow" style={{ overflow: 'hidden', }}>
      <div className="fixed top-0 left-0 w-[100%] h-screen bg-[#222222] z-[-1]"></div>
      <div className="fixed top-0 left-0 w-[100%] h-screen bg-[#0e0e0f] z-[3] flex flex-col items-center justify-center transition-transform duration-500 ease-in-out transform translate-y-0" style={{ zIndex: 9, transform: showMenu ? 'translateY(0)' : 'translateY(100%)' }}>
        <div className="flex w-full h-full flex-col items-start justify-start px-8 pt-24">
          <p className="text-2xl text-white font-bold">Menu</p>
          <div className="flex flex-col gap-4 mt-8 pb-8 h-full">
            <a href="https://resenha.app/login" className="text-white text-lg font-medium">Entrar</a>
            <button className="text-white text-lg font-medium" onClick={() => setShowCreateAccount(true)}>Criar conta</button>
          </div>
          <div className="flex flex-col w-1/2 items-start relative bottom-8 justify-start">
            <p className="text-md text-left font-bold mb-2 text-white">
              Nossas redes
            </p>
            <ul className="flex flex-col w-full items-start gap-3 justify-start">
              <li className="text-sm text-left font-light text-white">
                <a href="https://instagram.com/app.resenha"><FontAwesomeIcon icon={faInstagram} className="mr-2" />Instagram</a>
              </li>
              <li className="text-sm text-left font-light text-white">
                <a href="https://tiktok.com/resenha.app"><FontAwesomeIcon icon={faTiktok} className="mr-2" />TikTok</a>
              </li>
              <li className="text-sm text-left font-light text-white">
                <a href="https://resenha.app/perfil?u=resenha.app"><FontAwesomeIcon icon={faBolt} className="mr-2" />Resenha.app</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="fixed top-0 left-0 w-[100%] h-screen bg-[#0e0e0f] z-[3] flex flex-col items-center justify-center transition-transform duration-500 ease-in-out transform translate-y-0" style={{ zIndex: 99999, transform: showCreateAccount ? 'translateY(0)' : 'translateY(100%)' }}>
      <button className="bg-white text-white w-12 h-12 fixed top-5 right-[5.5vw] md:right-[7vw] items-center justify-center flex rounded-full"
        style={{ mixBlendMode: "difference", zIndex: 1 }}
        onClick={() => setShowCreateAccount(!showCreateAccount)}>
        <FontAwesomeIcon icon={faClose} className="text-2xl" style={{ mixBlendMode: "difference", zIndex: 999 }} />
      </button>
        <div className="flex w-full flex-col items-center justify-start px-4 mb-8 gap-5">
          <svg className='w-[70vw] md:w-[13vw]' width="1055" viewBox="0 0 1055 142" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M6.11384 13.6032C0 22.0182 0 34.022 0 58.0297C0 82.0373 0 94.0411 6.11384 102.456C8.08836 105.174 10.4783 107.564 13.196 109.538C21.611 115.652 33.6148 115.652 57.6225 115.652C81.6301 115.652 93.6339 115.652 102.049 109.538C104.767 107.564 107.157 105.174 109.131 102.456C115.245 94.0411 115.245 82.0373 115.245 58.0297C115.245 34.022 115.245 22.0182 109.131 13.6032C107.157 10.8856 104.767 8.49558 102.049 6.52106C93.6339 0.407227 81.6301 0.407227 57.6225 0.407227C33.6148 0.407227 21.611 0.407227 13.196 6.52106C10.4783 8.49558 8.08836 10.8856 6.11384 13.6032ZM69.7169 24.2977L35.1283 49.0726C32.6525 50.8459 33.3368 54.7286 36.2644 55.5188L44.8861 57.846C45.8406 58.1036 46.4063 59.095 46.1495 60.0603L38.75 87.8789C37.8908 91.1089 41.4524 93.6801 44.1998 91.8132L80.044 67.4576C82.5967 65.723 81.9483 61.7616 78.9807 60.9606L69.0835 58.2891C68.1289 58.0315 67.5633 57.0401 67.82 56.0748L75.2395 28.1813C76.11 24.9085 72.4538 22.3373 69.7169 24.2977Z" fill="white" />
            <path d="M169.666 109.961V0.407227H217.201C224.081 0.407227 230.075 1.6071 235.183 4.00685C240.291 6.4066 244.252 9.79755 247.067 14.1797C249.881 18.5619 251.289 23.7265 251.289 29.6737V31.5518C251.289 38.125 249.725 43.4462 246.598 47.5154C243.47 51.5845 239.613 54.5581 235.027 56.4362V59.2533C239.196 59.4619 242.428 60.9227 244.721 63.6354C247.015 66.2439 248.161 69.7391 248.161 74.1213V109.961H227.521V77.0949C227.521 74.5908 226.844 72.5562 225.488 70.9912C224.237 69.4261 222.1 68.6436 219.077 68.6436H190.306V109.961H169.666ZM190.306 49.863H215.012C219.911 49.863 223.716 48.5587 226.427 45.9503C229.241 43.2376 230.648 39.6901 230.648 35.3079V33.7429C230.648 29.3607 229.293 25.8654 226.583 23.257C223.873 20.5443 220.016 19.1879 215.012 19.1879H190.306V49.863Z" fill="white" />
            <path d="M296.609 112.152C288.895 112.152 282.067 110.535 276.125 107.3C270.287 103.962 265.701 99.3187 262.365 93.3715C259.133 87.3199 257.518 80.225 257.518 72.0867V70.2087C257.518 62.0704 259.133 55.0276 262.365 49.0804C265.596 43.0289 270.131 38.3859 275.969 35.1514C281.806 31.8127 288.582 30.1433 296.296 30.1433C303.906 30.1433 310.525 31.8648 316.154 35.3079C321.784 38.6467 326.162 43.3419 329.289 49.3934C332.416 55.3406 333.98 62.279 333.98 70.2087V76.9384H277.532C277.741 82.2596 279.721 86.5896 283.474 89.9283C287.227 93.2671 291.814 94.9365 297.234 94.9365C302.759 94.9365 306.825 93.7366 309.431 91.3369C312.037 88.9371 314.017 86.2766 315.373 83.3551L331.478 91.8064C330.019 94.5192 327.882 97.4928 325.067 100.727C322.357 103.857 318.708 106.57 314.122 108.866C309.535 111.057 303.697 112.152 296.609 112.152ZM277.689 62.2269H313.965C313.548 57.7404 311.724 54.1408 308.492 51.428C305.365 48.7152 301.248 47.3589 296.14 47.3589C290.823 47.3589 286.601 48.7152 283.474 51.428C280.347 54.1408 278.418 57.7404 277.689 62.2269Z" fill="white" />
            <path d="M375.909 112.152C365.797 112.152 357.51 109.961 351.047 105.579C344.584 101.197 340.675 94.9365 339.32 86.7982L357.458 82.1031C358.188 85.7549 359.386 88.6241 361.054 90.7109C362.826 92.7976 364.963 94.3105 367.465 95.2495C370.071 96.0842 372.886 96.5016 375.909 96.5016C380.496 96.5016 383.884 95.719 386.073 94.154C388.262 92.4846 389.356 90.45 389.356 88.0503C389.356 85.6505 388.314 83.8246 386.229 82.5726C384.144 81.2162 380.808 80.1207 376.222 79.286L371.844 78.5034C366.423 77.4601 361.471 76.0515 356.989 74.2778C352.506 72.3997 348.91 69.8435 346.2 66.609C343.489 63.3746 342.134 59.2011 342.134 54.0886C342.134 46.3677 344.949 40.4726 350.578 36.4035C356.207 32.23 363.608 30.1433 372.782 30.1433C381.434 30.1433 388.627 32.0735 394.36 35.934C400.093 39.7944 403.846 44.8548 405.618 51.115L387.324 56.7492C386.49 52.7844 384.77 49.9673 382.164 48.2979C379.662 46.6285 376.534 45.7938 372.782 45.7938C369.029 45.7938 366.162 46.472 364.182 47.8284C362.201 49.0804 361.211 50.8541 361.211 53.1496C361.211 55.6536 362.253 57.5317 364.338 58.7838C366.423 59.9315 369.237 60.8183 372.782 61.4444L377.16 62.2269C382.998 63.2702 388.262 64.6788 392.953 66.4525C397.748 68.1219 401.501 70.5738 404.211 73.8083C407.026 76.9384 408.433 81.2162 408.433 86.6417C408.433 94.78 405.462 101.092 399.52 105.579C393.682 109.961 385.812 112.152 375.909 112.152Z" fill="white" />
            <path d="M453.218 112.152C445.504 112.152 438.676 110.535 432.734 107.3C426.897 103.962 422.31 99.3187 418.974 93.3715C415.743 87.3199 414.127 80.225 414.127 72.0867V70.2087C414.127 62.0704 415.743 55.0276 418.974 49.0804C422.206 43.0289 426.74 38.3859 432.578 35.1514C438.415 31.8127 445.191 30.1433 452.905 30.1433C460.515 30.1433 467.134 31.8648 472.764 35.3079C478.393 38.6467 482.771 43.3419 485.898 49.3934C489.026 55.3406 490.589 62.279 490.589 70.2087V76.9384H434.141C434.35 82.2596 436.331 86.5896 440.083 89.9283C443.836 93.2671 448.423 94.9365 453.843 94.9365C459.368 94.9365 463.434 93.7366 466.04 91.3369C468.646 88.9371 470.627 86.2766 471.982 83.3551L488.087 91.8064C486.628 94.5192 484.491 97.4928 481.676 100.727C478.966 103.857 475.318 106.57 470.731 108.866C466.144 111.057 460.307 112.152 453.218 112.152ZM434.298 62.2269H470.574C470.157 57.7404 468.333 54.1408 465.102 51.428C461.974 48.7152 457.857 47.3589 452.749 47.3589C447.432 47.3589 443.211 48.7152 440.083 51.428C436.956 54.1408 435.028 57.7404 434.298 62.2269Z" fill="white" />
            <path d="M500.307 109.961V32.3343H519.696V42.5072H522.511C523.762 39.7944 526.107 37.2382 529.547 34.8384C532.987 32.3343 538.199 31.0823 545.184 31.0823C551.23 31.0823 556.494 32.4908 560.977 35.3079C565.563 38.0207 569.108 41.829 571.609 46.7328C574.111 51.5323 575.362 57.1665 575.362 63.6354V109.961H555.66V65.2005C555.66 59.3576 554.201 54.9755 551.282 52.054C548.467 49.1326 544.402 47.6719 539.086 47.6719C533.039 47.6719 528.348 49.7064 525.013 53.7756C521.677 57.7404 520.009 63.3224 520.009 70.5217V109.961H500.307Z" fill="white" />
            <path d="M588.843 109.961V0.407227H608.544V41.8812H611.359C612.193 40.2118 613.496 38.5424 615.268 36.873C617.04 35.2036 619.386 33.8472 622.305 32.8039C625.328 31.6562 629.133 31.0823 633.719 31.0823C639.765 31.0823 645.03 32.4908 649.512 35.3079C654.099 38.0207 657.643 41.829 660.145 46.7328C662.647 51.5323 663.898 57.1665 663.898 63.6354V109.961H644.196V65.2005C644.196 59.3576 642.736 54.9755 639.818 52.054C637.003 49.1326 632.937 47.6719 627.621 47.6719C621.575 47.6719 616.884 49.7064 613.548 53.7756C610.212 57.7404 608.544 63.3224 608.544 70.5217V109.961H588.843Z" fill="white" />
            <path d="M701.458 112.152C695.933 112.152 690.982 111.213 686.604 109.335C682.225 107.353 678.733 104.536 676.127 100.884C673.625 97.1276 672.374 92.5889 672.374 87.2678C672.374 81.9466 673.625 77.5122 676.127 73.9648C678.733 70.313 682.277 67.6002 686.76 65.8265C691.347 63.9484 696.559 63.0094 702.396 63.0094H723.662V58.6273C723.662 54.9755 722.515 52.0019 720.222 49.7064C717.929 47.3067 714.28 46.1068 709.276 46.1068C704.377 46.1068 700.729 47.2545 698.331 49.5499C695.933 51.741 694.37 54.6103 693.64 58.1577L675.502 52.054C676.753 48.0892 678.733 44.4896 681.444 41.2552C684.258 37.9164 687.959 35.2558 692.545 33.2734C697.236 31.1866 702.918 30.1433 709.589 30.1433C719.805 30.1433 727.884 32.6995 733.826 37.812C739.768 42.9245 742.739 50.3325 742.739 60.0358V88.9893C742.739 92.1194 744.198 93.6845 747.117 93.6845H753.371V109.961H740.237C736.38 109.961 733.2 109.022 730.698 107.144C728.197 105.266 726.946 102.762 726.946 99.6317V99.4752H723.975C723.558 100.727 722.62 102.397 721.16 104.483C719.701 106.466 717.407 108.239 714.28 109.805C711.153 111.37 706.879 112.152 701.458 112.152ZM704.898 96.1886C710.423 96.1886 714.906 94.6757 718.346 91.6499C721.89 88.5198 723.662 84.3985 723.662 79.286V77.7209H703.804C700.155 77.7209 697.289 78.5034 695.204 80.0685C693.119 81.6336 692.076 83.8246 692.076 86.6417C692.076 89.4588 693.171 91.7542 695.36 93.528C697.549 95.3017 700.729 96.1886 704.898 96.1886Z" fill="white" />
            <path d="M772.311 112.152C768.141 112.152 764.597 110.796 761.678 108.083C758.864 105.266 757.456 101.666 757.456 97.2841C757.456 92.902 758.864 89.3545 761.678 86.6417C764.597 83.8246 768.141 82.4161 772.311 82.4161C776.585 82.4161 780.129 83.8246 782.944 86.6417C785.758 89.3545 787.166 92.902 787.166 97.2841C787.166 101.666 785.758 105.266 782.944 108.083C780.129 110.796 776.585 112.152 772.311 112.152Z" fill="white" />
            <path d="M822.794 112.152C817.269 112.152 812.317 111.213 807.939 109.335C803.561 107.353 800.069 104.536 797.463 100.884C794.961 97.1276 793.71 92.5889 793.71 87.2678C793.71 81.9466 794.961 77.5122 797.463 73.9648C800.069 70.313 803.613 67.6002 808.095 65.8265C812.682 63.9484 817.894 63.0094 823.732 63.0094H844.997V58.6273C844.997 54.9755 843.851 52.0019 841.557 49.7064C839.264 47.3067 835.616 46.1068 830.612 46.1068C825.713 46.1068 822.064 47.2545 819.666 49.5499C817.269 51.741 815.705 54.6103 814.975 58.1577L796.837 52.054C798.088 48.0892 800.069 44.4896 802.779 41.2552C805.594 37.9164 809.294 35.2558 813.881 33.2734C818.572 31.1866 824.253 30.1433 830.925 30.1433C841.141 30.1433 849.219 32.6995 855.161 37.812C861.103 42.9245 864.074 50.3325 864.074 60.0358V88.9893C864.074 92.1194 865.533 93.6845 868.452 93.6845H874.707V109.961H861.572C857.715 109.961 854.536 109.022 852.034 107.144C849.532 105.266 848.281 102.762 848.281 99.6317V99.4752H845.31C844.893 100.727 843.955 102.397 842.496 104.483C841.036 106.466 838.743 108.239 835.616 109.805C832.488 111.37 828.214 112.152 822.794 112.152ZM826.234 96.1886C831.759 96.1886 836.241 94.6757 839.681 91.6499C843.225 88.5198 844.997 84.3985 844.997 79.286V77.7209H825.139C821.491 77.7209 818.624 78.5034 816.539 80.0685C814.454 81.6336 813.412 83.8246 813.412 86.6417C813.412 89.4588 814.506 91.7542 816.695 93.528C818.885 95.3017 822.064 96.1886 826.234 96.1886Z" fill="white" />
            <path d="M881.294 141.262V32.3343H900.683V41.7247H903.497C905.27 38.6989 908.032 36.0383 911.785 33.7429C915.538 31.3431 920.906 30.1433 927.891 30.1433C934.145 30.1433 939.931 31.7083 945.247 34.8384C950.563 37.8642 954.837 42.3507 958.069 48.2979C961.3 54.2451 962.916 61.4444 962.916 69.8956V72.3997C962.916 80.851 961.3 88.0503 958.069 93.9975C954.837 99.9447 950.563 104.483 945.247 107.613C939.931 110.639 934.145 112.152 927.891 112.152C923.2 112.152 919.238 111.578 916.007 110.431C912.879 109.387 910.325 108.031 908.345 106.361C906.468 104.588 904.957 102.814 903.81 101.04H900.996V141.262H881.294ZM921.949 94.9365C928.099 94.9365 933.155 93.0063 937.116 89.1458C941.182 85.181 943.214 79.4425 943.214 71.9302V70.3652C943.214 62.8529 941.182 57.1665 937.116 53.3061C933.051 49.3413 927.995 47.3589 921.949 47.3589C915.902 47.3589 910.847 49.3413 906.781 53.3061C902.716 57.1665 900.683 62.8529 900.683 70.3652V71.9302C900.683 79.4425 902.716 85.181 906.781 89.1458C910.847 93.0063 915.902 94.9365 921.949 94.9365Z" fill="white" />
            <path d="M973.189 141.262V32.3343H992.578V41.7247H995.392C997.165 38.6989 999.927 36.0383 1003.68 33.7429C1007.43 31.3431 1012.8 30.1433 1019.79 30.1433C1026.04 30.1433 1031.83 31.7083 1037.14 34.8384C1042.46 37.8642 1046.73 42.3507 1049.96 48.2979C1053.2 54.2451 1054.81 61.4444 1054.81 69.8956V72.3997C1054.81 80.851 1053.2 88.0503 1049.96 93.9975C1046.73 99.9447 1042.46 104.483 1037.14 107.613C1031.83 110.639 1026.04 112.152 1019.79 112.152C1015.09 112.152 1011.13 111.578 1007.9 110.431C1004.77 109.387 1002.22 108.031 1000.24 106.361C998.363 104.588 996.852 102.814 995.705 101.04H992.891V141.262H973.189ZM1013.84 94.9365C1019.99 94.9365 1025.05 93.0063 1029.01 89.1458C1033.08 85.181 1035.11 79.4425 1035.11 71.9302V70.3652C1035.11 62.8529 1033.08 57.1665 1029.01 53.3061C1024.95 49.3413 1019.89 47.3589 1013.84 47.3589C1007.8 47.3589 1002.74 49.3413 998.676 53.3061C994.611 57.1665 992.578 62.8529 992.578 70.3652V71.9302C992.578 79.4425 994.611 85.181 998.676 89.1458C1002.74 93.0063 1007.8 94.9365 1013.84 94.9365Z" fill="white" />
          </svg>
          <p className="text-md text-white text-center font-medium">Criar conta</p>
        </div>
        <div>
          <form className="flex flex-col gap-4 w-full max-w-[400px]">
            <input required={true} type="text" placeholder="Nome" className="bg-[#f1f1f1] px-4 py-2 rounded-full font-bold text-md" style={{color: "black"}} value={username} onChange={(e) => setUsername(e.target.value)} />
            <input required={true} type="text" placeholder="E-mail" className="bg-[#f1f1f1] px-4 py-2 rounded-full font-bold text-md" style={{color: "black"}} value={email} onChange={(e) => setEmail(e.target.value)} />
            <div className="relative">
              <input required={true} type={showPassword ? "text" : "password"} placeholder="Senha" className="bg-[#f1f1f1] px-4 py-2 rounded-full font-bold text-md pr-10" style={{color: "black"}} value={password} onChange={handlePasswordChange} />
              <button type="button" onClick={toggleShowPassword} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </button>
            </div>
            {startedTypingPassword && <div className="flex gap-2 items-center justify-start">
              {strongPassword && <FontAwesomeIcon icon={faCircleCheck} className="text-md text-white" />}
              {!strongPassword && <FontAwesomeIcon icon={faCircleXmark} className="text-md text-white" />}
              <p className="text-xs text-left font-light text-white">{passwordFeedback}</p>
            </div>}
            <button className={`${(strongPassword && username && email.includes('@') && (email.endsWith('.com') || email.endsWith('.app') || email.endsWith('.co') || email.endsWith('.net'))) ? "bg-[#8E00FF]" : "bg-[#767676]"} text-white px-4 py-2 rounded-full font-bold text-md`} type="submit" disabled={!strongPassword}>
              Criar conta
            </button>
          </form>
        </div>
      </div>

      <svg className=" text-white w-11 mt-1 h-11 fixed top-5 left-[5.5vw] md:left-[7.7vw] items-center justify-center flex"
        style={{ mixBlendMode: "difference", zIndex: 999 }} width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M26.5254 57.252C0 93.7612 0 145.841 0 250C0 354.159 0 406.239 26.5254 442.748C35.092 454.539 45.4611 464.908 57.252 473.475C93.7612 500 145.841 500 250 500C354.159 500 406.239 500 442.748 473.475C454.539 464.908 464.908 454.539 473.475 442.748C500 406.239 500 354.159 500 250C500 145.841 500 93.7612 473.475 57.252C464.908 45.4611 454.539 35.092 442.748 26.5254C406.239 0 354.159 0 250 0C145.841 0 93.7612 0 57.252 26.5254C45.4611 35.092 35.092 45.4611 26.5254 57.252ZM302.473 103.651L152.407 211.139C141.666 218.832 144.634 235.678 157.336 239.106L194.742 249.203C198.883 250.32 201.338 254.622 200.224 258.81L168.12 379.503C164.392 393.517 179.845 404.672 191.765 396.573L347.278 290.903C358.353 283.378 355.54 266.191 342.664 262.716L299.724 251.125C295.583 250.007 293.129 245.706 294.243 241.518L326.433 120.5C330.21 106.301 314.347 95.1454 302.473 103.651Z" fill="white" />
      </svg>

      <button className="bg-white text-white w-12 h-12 fixed top-5 right-[5.5vw] md:right-[7vw] items-center justify-center flex rounded-full"
        style={{ mixBlendMode: "difference", zIndex: 999 }}
        onClick={() => setShowMenu(!showMenu)}>
        {!showMenu && <FontAwesomeIcon icon={faBars} className="text-2xl" style={{ mixBlendMode: "difference", zIndex: 999 }} />}
        {showMenu && <FontAwesomeIcon icon={faClose} className="text-2xl" style={{ mixBlendMode: "difference", zIndex: 999 }} />}
      </button>
      <section className="flex flex-col relative w-[100%] items-center justify-center min-h-[100vh] py-2 bg-white">
        <Image src="https://media.resenha.app/s/lp/banner.jpg" width={1333} height={889} alt='girl vibing' about='girl vibing' className="absolute z-[0] w-full h-full object-cover"/>
        <div className='flex gap-4 flex-col justify-center items-center max-w-[90%] z-[4]'>
          <h1 className="text-4xl font-bold text-center text-[#ffffff]">
            VIVA UMA NOVA EXPERIÊNCIA
          </h1>
          <div className='flex flex-col gap-3 items-center justify-center max-w-[100%]'>
            <p className="text-md text-center font-medium text-[#ffffff]">
              De uma forma igualmente nova.
            </p>

            <button className="bg-transparent my-6 ring-1 ring-[#ffffff] text-white px-4 py-2 rounded-full font-bold text-md" onClick={() => scrollDown()}>
              Descubra...
            </button>
          </div>
        </div>
      </section>
      <section ref={sec01Ref} className="flex flex-col relative w-[100%] items-center justify-center min-h-[140vh] p-4 py-2 bg-[#ff1088]" style={{ overflowX: 'clip' }}>
      <Image src='https://media.resenha.app/s/lp/phone.png' width={1600} height={2059} alt='props' about='props' className="absolute z-[1] w-full h-full right-[30vw] md:right-[-90px] top-[38vh] md:top-0 scale-[2.3] md:scale-[1.9] md:z-[2] object-contain md:items-center flex " />
        <div style={{
          width: '150%', height: '300px', position: 'absolute',
          transform: `rotate(${rotationDeg - 8}deg)`, left: '5', top: `-100px`, zIndex: 1,
          backgroundColor: '#ff1088',
        }} />
        <div className='mb-[60vh] flex gap-4 flex-col z-[5] justify-center items-center max-w-[90%] md:max-w-[25%]'>
          <h1 className="text-4xl md:text-[45px] font-bold text-center text-white">
            A RESENHA QUE ESCOLHE VOCÊ
          </h1>
          <div className='flex flex-col gap-3 items-center justify-center max-w-[90%]'>
            <p className="text-md md:text-2xl text-center font-medium text-white">
              A gente te conecta a festas de acordo com o seu gosto.
            </p>
            <p className="text-md md:text-2xl text-center font-medium text-white">
              É simples: Você escolhe <b>o que curte</b>, e o Resenha.app te mostra <b>onde curtir</b>.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col relative w-[100%] items-center justify-center min-h-[120vh] p-4 py-2 bg-[#c9ef20]" style={{ overflowX: 'clip' }}>
      <Image src='https://media.resenha.app/s/lp/chat.png' width={1400} height={2471} alt='props' about='props' className="absolute z-[2] w-full h-full right-[] bottom-[10vh] scale-[1.2] object-contain" />
        <div style={{
          width: '150%', height: '300px', position: 'absolute',
          transform: `rotate(${rotationDeg - 17}deg)`, left: '5', top: `-100px`, zIndex: 0,
          backgroundColor: '#c9ef20',
        }} />
        <div className='mb-28 flex gap-4 flex-col justify-center items-center max-w-[90%] md:max-w-[30%]'>
          <h1 className="text-4xl md:text-[45px] font-bold text-center text-[#323232]">
            CRIE NOVAS CONEXÕES
          </h1>
          <div className='flex flex-col gap-3 items-center justify-center max-w-[90%]'>
            <p className="text-md md:text-2xl text-center font-medium text-[#323232]">
              Encontre pessoas com os mesmos gostos que você.
            </p>
            <p className="text-md md:text-2xl text-center font-medium text-[#323232]">
              E que curtem o mesmo rolê que você.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col relative w-[100%] items-center justify-center min-h-[120vh] p-4 py-2 bg-[#792ca5]" style={{ overflowX: 'clip' }}>
      <Image src='https://media.resenha.app/s/lp/prod.png' width={1400} height={2471} alt='props' about='props' className="absolute z-[1] w-full h-full right-[] bottom-[10vh] scale-[1.2] object-contain" />
      <Image src='https://media.resenha.app/s/lp/line.png' width={1400} height={2471} alt='props' about='props' className="absolute z-[1] w-full md:hidden h-full right-[] bottom-[10vh] scale-[1.2] object-contain" />
        <div style={{
          width: '150%', height: '300px', position: 'absolute',
          transform: `rotate(${rotationDeg - 25}deg)`, left: '5', top: `-100px`, zIndex: 0,
          backgroundColor: '#792ca5',
        }} />
        <div className='mb-28 flex gap-4 flex-col justify-center items-center max-w-[90%] md:max-w-[30%] z-[4]'>
          <h1 className="text-4xl md:text-[45px] font-bold text-center text-[#ffffff]">
            PARA PRODUTORES
          </h1>
          <div className='flex flex-col gap-3 items-center justify-center max-w-[100%]'>
            <p className="text-md md:text-2xl text-center font-medium text-[#ffffff]">
              Se você é um produtor de eventos, o Resenha.app é o lugar certo para você.
            </p>
            <p className="text-md md:text-2xl text-center font-medium text-[#ffffff]">
              O nosso algoritmo te conecta com pessoas que vão curtir o seu rolê.
            </p>
            <button className="bg-transparent my-6 ring-1 ring-[#ffffff] text-white px-4 py-2 rounded-full font-bold text-md" onClick={() => (window.location.href = '/saibamais/produtores')}>
              Saiba mais
            </button>
          </div>
        </div>
      </section>
      <section className="flex flex-col relative w-[100%] items-center justify-center min-h-[120vh] p-4 py-2 bg-[#2e7fc2]" style={{ overflowX: 'clip' }}>
      <Image src='https://media.resenha.app/s/lp/flamingos.png' width={1400} height={2471} alt='props' about='props' className="absolute z-[2] w-full h-full right-[] bottom-[10vh] scale-[1.6] object-contain" />

        <div style={{
          width: '150%', height: '300px', position: 'absolute',
          transform: `rotate(${rotationDeg - 36}deg)`, left: '5', top: `-100px`, zIndex: 1,
          backgroundColor: '#2e7fc2',
        }} />
        <div className='mb-28 flex gap-4 flex-col justify-center z-[3] items-center max-w-[90%] md:max-w-[30%]'>
          <h1 className="text-4xl md:text-[45px] font-bold text-center text-[#f3f3f3]">
            UM NOVO JEITO DE CURTIR
          </h1>
          <div className='flex flex-col gap-3 items-center justify-center max-w-[90%]'>
            <p className="text-md md:text-2xl text-center font-medium text-[#f3f3f3]">
              O Resenha.app é para quem quer desde uma festa em casa...
            </p>
            <p className="text-md md:text-2xl text-center font-medium text-[#f3f3f3]">
              ... até uma rave com milhares de pessoas.
            </p>
          </div>
        </div>
      </section>
      <section className="flex flex-col relative w-[100%] items-center justify-center min-h-[120vh] p-4 py-2 bg-[#f1f1f1]" style={{ overflowX: 'clip' }}>
      <Image src='https://media.resenha.app/s/lp/thunders.png' width={1400} height={2471} alt='props' about='props' className="absolute z-[2] w-full h-full right-[] bottom-[10vh] scale-[1.2] object-contain" />
        <div style={{
          width: '150%', height: '300px', position: 'absolute',
          transform: `rotate(${rotationDeg - 45}deg)`, left: '5', top: `-100px`, zIndex: 1,
          backgroundColor: '#f1f1f1',
        }} />
        <div className='mb-28 flex gap-4 flex-col justify-center items-center max-w-[90%] md:max-w-[30%]'>
          <h1 className="text-4xl md:text-[45px] font-bold text-center text-[#303030]">
            FAÇA ACONTECER!
          </h1>
          <div className='flex flex-col gap-3 items-center justify-center max-w-[100%]'>
            <p className="text-md md:text-2xl text-center font-medium text-[#303030]">
              Crie uma conta gratuitamente agora mesmo e viva novas experiências.
            </p>
            <button className="my-6 ring-1 md:text-2xl bg-[#8E00FF] ring-[] text-[#ffffff] z-[8] px-12 py-6 rounded-full font-bold text-md" onClick={() => setShowCreateAccount(true)}>
              Criar conta!
            </button>
          </div>
        </div>
      </section>
      <footer className="flex flex-col relative w-[100%] z-[1] items-start justify-start min-h-screen px-8 pb-8 pt-20 md:p-28 bg-[#36134f]">
        <div className='z-[2] text-white'>
          <p className="text-3xl text-left font-bold">
            Faça acontecer!
          </p>
          <p className="text-md text-left font-light max-w-[75%]">
            Com o resenha.app você sempre tem onde ir.
          </p>
        </div>
        <div className="flex flex-col w-full items-start gap-10 justify-start mt-8">
          <div className="flex flex-col w-2/3 items-start justify-start">
            <p className="text-md text-left font-bold mb-2 text-white">
              Saiba mais
            </p>
            <ul className="flex flex-col w-full items-start gap-3 justify-start">
              <li className="text-sm text-left font-light text-white">
                <a href="#" className='flex items-center hover:underline underline-offset-4'><FontAwesomeIcon icon={faCircle} className="mr-2" fontSize={6} />Sobre nós</a>
              </li>
              <li className="text-sm text-left font-light text-white">
                <a href="#" className='flex items-center hover:underline underline-offset-4'><FontAwesomeIcon icon={faCircle} className="mr-2" fontSize={6} />Dúvidas</a>
              </li>
              <li className="text-sm text-left font-light text-white">
                <a href="#" className='flex items-center hover:underline underline-offset-4'><FontAwesomeIcon icon={faCircle} className="mr-2" fontSize={6} />Termos de uso</a>
              </li>
              <li className="text-sm text-left font-light text-white">
                <a href="#" className='flex items-center hover:underline underline-offset-4'><FontAwesomeIcon icon={faCircle} className="mr-2" fontSize={6} />Política de privacidade</a>
              </li>
              <li className="text-sm text-left font-light text-white">
                <a href="#" className='flex items-center hover:underline underline-offset-4'><FontAwesomeIcon icon={faCircle} className="mr-2" fontSize={6} />Suporte</a>
              </li>
              <li className="text-sm text-left font-light text-white">
                <a href="#" className='flex items-center hover:underline underline-offset-4'><FontAwesomeIcon icon={faCircle} className="mr-2" fontSize={6} />Vagas</a>
              </li>
              <li className="text-sm text-left font-light text-white">
                <a href="#" className='flex items-center hover:underline underline-offset-4'><FontAwesomeIcon icon={faCircle} className="mr-2" fontSize={6} />Contato</a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col w-1/2 items-start justify-start">
            <p className="text-md text-left font-bold mb-2 text-white">
              Nossas redes
            </p>
            <ul className="flex flex-col w-full items-start gap-3 justify-start">
              <li className="text-sm text-left font-light text-white">
                <a className='hover:underline underline-offset-4' href="https://instagram.com/app.resenha"><FontAwesomeIcon icon={faInstagram} className="mr-2" />Instagram</a>
              </li>
              <li className="text-sm text-left font-light text-white">
                <a className='hover:underline underline-offset-4' href="https://tiktok.com/resenha.app"><FontAwesomeIcon icon={faTiktok} className="mr-2" />TikTok</a>
              </li>
              <li className="text-sm text-left font-light text-white">
                <a className='hover:underline underline-offset-4' href="https://resenha.app/perfil?u=resenha.app"><FontAwesomeIcon icon={faBolt} className="mr-2" />Resenha.app</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-[#36134f] px-8 pb-4 z-[3] flex flex-col items-center justify-center md:items-start">
          <div className="flex flex-row gap-1 items-center justify-center md:justify-start">
            <svg className='w-[9px] mb-[2px]' viewBox="0 0 210 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M157.473 3.65051L7.40688 111.139C-3.33441 118.832 -0.365535 135.678 12.336 139.106L49.742 149.203C53.8833 150.32 56.3375 154.622 55.2235 158.81L23.1201 279.503C19.3925 293.517 34.8445 304.672 46.7645 296.572L202.278 190.903C213.353 183.378 210.54 166.191 197.664 162.716L154.724 151.125C150.583 150.007 148.129 145.706 149.243 141.518L181.433 20.4998C185.21 6.30042 169.347 -4.85469 157.473 3.65051Z" fill="white" />
            </svg>
            <p className="text-sm text-center font-light text-white">Resenha.app&reg; {new Date().getFullYear()}</p>
          </div>
          <p className="text-sm text-left font-light text-white">
            CNPJ: 52.432.478/0001-94
          </p>
        </div>
      </footer>
    </main>
  )
}