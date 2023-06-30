import React from 'react';

const Button = ({ label, icon, action, iconSide = 'left', height = 1, width = 1, textAlign = 'center', active = true }) => {
    // map height and width to the respective Tailwind classes
    const sizes = {
        1: 'w-full',
        2: 'w-4/5',
        3: 'w-[190px]',
    };

    let iconSvg;
    if (icon === 'plus') {
        iconSvg = (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30ZM16.0588 9.05882C16.0588 8.47405 15.5848 8 15 8C14.4152 8 13.9412 8.47405 13.9412 9.05882V13.2353C13.9412 13.6251 13.6251 13.9412 13.2353 13.9412H9.05882C8.47405 13.9412 8 14.4152 8 15C8 15.5848 8.47405 16.0588 9.05882 16.0588H13.2353C13.6251 16.0588 13.9412 16.3749 13.9412 16.7647V21C13.9412 21.5848 14.4152 22.0588 15 22.0588C15.5848 22.0588 16.0588 21.5848 16.0588 21V16.7647C16.0588 16.3749 16.3749 16.0588 16.7647 16.0588H20.9412C21.5259 16.0588 22 15.5848 22 15C22 14.4152 21.5259 13.9412 20.9412 13.9412H16.7647C16.3749 13.9412 16.0588 13.6251 16.0588 13.2353V9.05882Z" fill="#8E00FF" />
            </svg>
        );
    } else if (icon === 'arrow') {
        iconSvg = (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30ZM9.8125 14.3585C9.36377 14.3585 9 14.7223 9 15.171C9 15.6197 9.36377 15.9835 9.8125 15.9835H16.4729C17.3616 15.9835 17.8088 17.0562 17.1832 17.6874L14.9275 19.9636C14.6151 20.2788 14.6162 20.7872 14.93 21.101C15.2448 21.4158 15.7552 21.4158 16.07 21.101L21.2929 15.8781C21.6834 15.4876 21.6834 14.8544 21.2929 14.4639L16.0688 9.2398C15.7531 8.92405 15.2425 8.91955 14.9213 9.22968C14.5919 9.54764 14.5872 10.0739 14.9109 10.3977L17.1647 12.6514C17.7946 13.2814 17.3485 14.3585 16.4576 14.3585H9.8125Z" fill="#8E00FF" />
            </svg>
        );
    } else if (icon === 'share') {
        iconSvg = (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30ZM20 11.1667C20 12.3633 19.015 13.3333 17.8 13.3333C17.4854 13.3333 17.1863 13.2683 16.9157 13.1512C16.5396 12.9884 16.0963 12.9364 15.7531 13.1617L13.8807 14.391C13.5276 14.6229 13.4 15.0738 13.4 15.5C13.4 15.9263 13.5276 16.3772 13.8807 16.6091L15.753 17.8384C16.0962 18.0637 16.5395 18.0116 16.9156 17.8489C17.1862 17.7317 17.4854 17.6667 17.8 17.6667C19.015 17.6667 20 18.6367 20 19.8333C20 21.0299 19.015 22 17.8 22C16.585 22 15.6 21.0299 15.6 19.8333C15.6 19.4071 15.4724 18.9562 15.1193 18.7243L13.2469 17.495C12.9038 17.2697 12.4604 17.3217 12.0844 17.4845C11.8137 17.6016 11.5146 17.6667 11.2 17.6667C9.98497 17.6667 9 16.6966 9 15.5C9 14.3034 9.98497 13.3333 11.2 13.3333C11.5146 13.3333 11.8138 13.3984 12.0844 13.5155C12.4605 13.6783 12.9039 13.7304 13.247 13.5051L15.1193 12.2758C15.4724 12.0439 15.6 11.593 15.6 11.1667C15.6 9.97005 16.585 9 17.8 9C19.015 9 20 9.97005 20 11.1667Z" fill="#8E00FF" />
            </svg>
        );
    } else if (icon === 'user') {
        iconSvg = (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.625 11.25C20.625 12.7418 20.0324 14.1726 18.9775 15.2275C17.9226 16.2824 16.4918 16.875 15 16.875C13.5082 16.875 12.0774 16.2824 11.0225 15.2275C9.96763 14.1726 9.375 12.7418 9.375 11.25C9.375 9.75816 9.96763 8.32742 11.0225 7.27252C12.0774 6.21763 13.5082 5.625 15 5.625C16.4918 5.625 17.9226 6.21763 18.9775 7.27252C20.0324 8.32742 20.625 9.75816 20.625 11.25Z" fill="#8E00FF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15C0 11.0218 1.58035 7.20644 4.3934 4.3934C7.20644 1.58035 11.0218 0 15 0C18.9782 0 22.7936 1.58035 25.6066 4.3934C28.4196 7.20644 30 11.0218 30 15C30 18.9782 28.4196 22.7936 25.6066 25.6066C22.7936 28.4196 18.9782 30 15 30C11.0218 30 7.20644 28.4196 4.3934 25.6066C1.58035 22.7936 0 18.9782 0 15ZM15 1.875C12.5283 1.87513 10.1069 2.57318 8.0145 3.8888C5.92207 5.20442 4.24366 7.08414 3.17243 9.31161C2.10121 11.5391 1.68072 14.0238 1.95937 16.4797C2.23802 18.9356 3.20447 21.2629 4.7475 23.1938C6.07875 21.0488 9.00938 18.75 15 18.75C20.9906 18.75 23.9194 21.0469 25.2525 23.1938C26.7955 21.2629 27.762 18.9356 28.0406 16.4797C28.3193 14.0238 27.8988 11.5391 26.8276 9.31161C25.7563 7.08414 24.0779 5.20442 21.9855 3.8888C19.8931 2.57318 17.4717 1.87513 15 1.875Z" fill="#8E00FF" />
            </svg>
        );
    } else if (icon === 'wallet') {
        iconSvg = (
            <svg width="30" height="27" viewBox="0 0 30 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.755 0.0822456C23.1695 -0.0191895 23.6021 -0.0269037 24.0201 0.0596888C24.4381 0.146281 24.8305 0.324904 25.1673 0.581997C25.5042 0.83909 25.7768 1.1679 25.9644 1.54345C26.152 1.91901 26.2497 2.33144 26.25 2.74944V4.69389C26.25 4.85598 26.3843 4.98739 26.55 4.98739H27.1875C27.9334 4.98739 28.6488 5.27729 29.1762 5.79331C29.7037 6.30933 30 7.0092 30 7.73896V24.2484C30 24.9782 29.7037 25.6781 29.1762 26.1941C28.6488 26.7101 27.9334 27 27.1875 27H2.8125C2.06658 27 1.35121 26.7101 0.823762 26.1941C0.296316 25.6781 1.83922e-07 24.9782 1.83922e-07 24.2484V7.73896C-0.000261489 7.03063 0.278704 6.34947 0.778833 5.83728C1.27204 5.33219 1.94285 5.02978 2.65499 4.99071C2.67493 4.98962 2.69476 4.98684 2.71414 4.9821L22.755 0.0822456ZM12.7933 4.40915C12.4501 4.49308 12.5122 4.98739 12.866 4.98739H24.075C24.2407 4.98739 24.375 4.85598 24.375 4.69389V2.74944C24.3747 2.61028 24.342 2.47301 24.2794 2.34803C24.2168 2.22306 24.126 2.11365 24.0138 2.0281C23.9016 1.94256 23.771 1.88311 23.6318 1.85426C23.4927 1.82541 23.3486 1.82792 23.2106 1.8616L12.7933 4.40915Z" fill="#8E00FF" />
            </svg>
        );
    } else if (icon === 'thunder') {
        iconSvg = (
            <svg width="22" height="32" viewBox="0 0 22 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.694175 11.8355L16.5411 0.316792C17.795 -0.594649 19.4702 0.600763 19.0713 2.12241L15.6721 15.0911C15.5544 15.5399 15.8136 16.0008 16.2509 16.1206L20.7854 17.3626C22.145 17.7351 22.4421 19.5769 21.2725 20.3833L4.85034 31.7071C3.59159 32.5751 1.95986 31.3797 2.35349 29.8779L5.74361 16.9441C5.86125 16.4953 5.60209 16.0343 5.16476 15.9146L1.21469 14.8326C-0.126591 14.4652 -0.440106 12.66 0.694175 11.8355Z" fill="#8E00FF" />
            </svg>
        );
    } else if (icon === 'gear') {
        iconSvg = (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.6344 1.96875C16.86 -0.65625 13.14 -0.65625 12.3656 1.96875L12.1781 2.60625C12.0624 2.99924 11.8602 3.36135 11.5864 3.66602C11.3125 3.9707 10.9739 4.21021 10.5954 4.36699C10.2169 4.52378 9.80818 4.59386 9.39909 4.57211C8.99 4.55035 8.59096 4.4373 8.23125 4.24125L7.65 3.9225C5.24437 2.61375 2.61375 5.24438 3.92437 7.64812L4.24125 8.23125C5.0775 9.76875 4.28437 11.6831 2.60625 12.1781L1.96875 12.3656C-0.65625 13.14 -0.65625 16.86 1.96875 17.6344L2.60625 17.8219C2.99924 17.9376 3.36135 18.1398 3.66602 18.4136C3.9707 18.6875 4.21021 19.0261 4.36699 19.4046C4.52378 19.7831 4.59386 20.1918 4.57211 20.6009C4.55035 21.01 4.4373 21.409 4.24125 21.7687L3.9225 22.35C2.61375 24.7556 5.24438 27.3862 7.64812 26.0756L8.23125 25.7587C8.59096 25.5627 8.99 25.4497 9.39909 25.4279C9.80818 25.4061 10.2169 25.4762 10.5954 25.633C10.9739 25.7898 11.3125 26.0293 11.5864 26.334C11.8602 26.6387 12.0624 27.0008 12.1781 27.3937L12.3656 28.0312C13.14 30.6562 16.86 30.6562 17.6344 28.0312L17.8219 27.3937C17.9376 27.0008 18.1398 26.6387 18.4136 26.334C18.6875 26.0293 19.0261 25.7898 19.4046 25.633C19.7831 25.4762 20.1918 25.4061 20.6009 25.4279C21.01 25.4497 21.409 25.5627 21.7687 25.7587L22.35 26.0775C24.7556 27.3863 27.3862 24.7556 26.0756 22.3519L25.7587 21.7687C25.5627 21.409 25.4497 21.01 25.4279 20.6009C25.4061 20.1918 25.4762 19.7831 25.633 19.4046C25.7898 19.0261 26.0293 18.6875 26.334 18.4136C26.6387 18.1398 27.0008 17.9376 27.3937 17.8219L28.0312 17.6344C30.6562 16.86 30.6562 13.14 28.0312 12.3656L27.3937 12.1781C27.0008 12.0624 26.6387 11.8602 26.334 11.5864C26.0293 11.3125 25.7898 10.9739 25.633 10.5954C25.4762 10.2169 25.4061 9.80818 25.4279 9.39909C25.4497 8.99 25.5627 8.59096 25.7587 8.23125L26.0775 7.65C27.3863 5.24437 24.7556 2.61375 22.3519 3.92437L21.7687 4.24125C21.409 4.4373 21.01 4.55035 20.6009 4.57211C20.1918 4.59386 19.7831 4.52378 19.4046 4.36699C19.0261 4.21021 18.6875 3.9707 18.4136 3.66602C18.1398 3.36135 17.9376 2.99924 17.8219 2.60625L17.6344 1.96875ZM15 20.4919C15 20.4929 14.9992 20.4938 14.9981 20.4938C13.5418 20.4933 12.1452 19.9145 11.1153 18.8847C10.0851 17.8544 9.50625 16.457 9.50625 15C9.50625 13.543 10.0851 12.1456 11.1153 11.1153C12.1456 10.0851 13.543 9.50625 15 9.50625C16.4565 9.50625 17.8534 10.0849 18.8833 11.1148C19.9133 12.1447 20.4919 13.5416 20.4919 14.9981C20.4919 16.4547 19.9133 17.8515 18.8833 18.8815C17.8539 19.911 16.4577 20.4895 15.0019 20.49C15.0008 20.49 15 20.4908 15 20.4919V20.4919Z" fill="#8E00FF" />
            </svg>
        );
    } else if (icon === 'trusted') {
        iconSvg = (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.876 1.63168C18.3713 1.11517 17.7684 0.704756 17.1027 0.42455C16.4371 0.144344 15.7222 0 15 0C14.2778 0 13.5629 0.144344 12.8973 0.42455C12.2316 0.704756 11.6287 1.11517 11.124 1.63168L10.2674 2.51025C10.0696 2.71313 9.79723 2.82599 9.51391 2.82249L8.2887 2.80735C7.56628 2.7988 6.84945 2.93477 6.18035 3.20728C5.51126 3.47978 4.9034 3.88331 4.39254 4.39414C3.88168 4.90497 3.47813 5.51279 3.2056 6.18184C2.93308 6.8509 2.7971 7.56769 2.80565 8.29006L2.81943 9.51677C2.82261 9.79915 2.7102 10.0706 2.5083 10.268L1.63178 11.1252C1.11524 11.6299 0.704801 12.2327 0.424577 12.8983C0.144353 13.5639 0 14.2788 0 15.0009C0 15.7231 0.144353 16.438 0.424577 17.1036C0.704801 17.7691 1.11524 18.372 1.63178 18.8767L2.50909 19.7333C2.71164 19.9311 2.8243 20.2032 2.8208 20.4863L2.80565 21.7118C2.7971 22.4342 2.93308 23.151 3.2056 23.82C3.47813 24.4891 3.88168 25.0969 4.39254 25.6077C4.9034 26.1186 5.51126 26.5221 6.18035 26.7946C6.84945 27.0671 7.56628 27.2031 8.2887 27.1945L9.51555 27.1807C9.79791 27.1776 10.0693 27.29 10.2667 27.4918L11.124 28.3683C11.6287 28.8848 12.2316 29.2952 12.8973 29.5754C13.5629 29.8557 14.2778 30 15 30C15.7222 30 16.4371 29.8557 17.1027 29.5754C17.7684 29.2952 18.3713 28.8848 18.876 28.3683L19.7327 27.491C19.9305 27.2885 20.2026 27.1759 20.4856 27.1794L21.7113 27.1945C22.4337 27.2031 23.1506 27.0671 23.8196 26.7946C24.4887 26.5221 25.0966 26.1186 25.6075 25.6077C26.1183 25.0969 26.5219 24.4891 26.7944 23.82C27.0669 23.151 27.2029 22.4342 27.1944 21.7118L27.1806 20.4851C27.1774 20.2027 27.2898 19.9313 27.4917 19.7339L28.3682 18.8767C28.8848 18.372 29.2952 17.7691 29.5754 17.1036C29.8556 16.438 30 15.7231 30 15.0009C30 14.2788 29.8556 13.5639 29.5754 12.8983C29.2952 12.2327 28.8848 11.6299 28.3682 11.1252L27.4909 10.2686C27.2884 10.0708 27.1757 9.79867 27.1792 9.5156L27.1944 8.29006C27.2029 7.56769 27.0669 6.8509 26.7944 6.18184C26.5219 5.51279 26.1183 4.90497 25.6075 4.39414C25.0966 3.88331 24.4887 3.47978 23.8196 3.20728C23.1506 2.93477 22.4337 2.7988 21.7113 2.80735L20.4849 2.82113C20.2023 2.8243 19.9307 2.71169 19.7332 2.50946L18.876 1.63168ZM19.4142 12.8521L13.7886 18.4773C13.7015 18.5646 13.5981 18.6339 13.4842 18.6812C13.3703 18.7284 13.2481 18.7528 13.1248 18.7528C13.0015 18.7528 12.8794 18.7284 12.7655 18.6812C12.6516 18.6339 12.5481 18.5646 12.461 18.4773L9.64821 15.6647C9.56104 15.5775 9.49189 15.4741 9.44471 15.3602C9.39753 15.2463 9.37325 15.1242 9.37325 15.0009C9.37325 14.8777 9.39753 14.7556 9.44471 14.6417C9.49189 14.5278 9.56104 14.4243 9.64821 14.3372C9.73539 14.25 9.83887 14.1808 9.95277 14.1337C10.0667 14.0865 10.1887 14.0622 10.312 14.0622C10.4353 14.0622 10.5574 14.0865 10.6713 14.1337C10.7852 14.1808 10.8887 14.25 10.9758 14.3372L12.759 16.1218C12.961 16.3239 13.2887 16.324 13.4907 16.1219L18.0866 11.5246C18.2626 11.3485 18.5014 11.2496 18.7504 11.2496C18.9994 11.2496 19.2381 11.3485 19.4142 11.5246C19.5902 11.7006 19.6892 11.9394 19.6892 12.1883C19.6892 12.4373 19.5902 12.6761 19.4142 12.8521Z" fill="#8E00FF" />
            </svg>
        );
    } else if (icon === 'question') {
        iconSvg = (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 15C30 18.9782 28.4196 22.7936 25.6066 25.6066C22.7936 28.4196 18.9782 30 15 30C11.0218 30 7.20644 28.4196 4.3934 25.6066C1.58035 22.7936 0 18.9782 0 15C0 11.0218 1.58035 7.20644 4.3934 4.3934C7.20644 1.58035 11.0218 0 15 0C18.9782 0 22.7936 1.58035 25.6066 4.3934C28.4196 7.20644 30 11.0218 30 15ZM10.305 11.3119H11.8519C12.1106 11.3119 12.3169 11.1 12.3506 10.8431C12.5194 9.61312 13.3631 8.71688 14.8669 8.71688C16.1531 8.71688 17.3306 9.36 17.3306 10.9069C17.3306 12.0975 16.6294 12.645 15.5212 13.4775C14.2594 14.3944 13.26 15.465 13.3313 17.2031L13.3369 17.61C13.3388 17.733 13.3891 17.8503 13.4768 17.9366C13.5645 18.0229 13.6826 18.0713 13.8056 18.0712H15.3262C15.4506 18.0712 15.5698 18.0219 15.6577 17.934C15.7456 17.846 15.795 17.7268 15.795 17.6025V17.4056C15.795 16.0594 16.3069 15.6675 17.6888 14.6194C18.8306 13.7512 20.0213 12.7875 20.0213 10.7644C20.0213 7.93125 17.6288 6.5625 15.0094 6.5625C12.6338 6.5625 10.0313 7.66875 9.85313 10.8487C9.85056 10.9093 9.86041 10.9697 9.88206 11.0263C9.90371 11.0829 9.93672 11.1345 9.97904 11.1779C10.0214 11.2213 10.0721 11.2555 10.1282 11.2786C10.1842 11.3016 10.2444 11.313 10.305 11.3119ZM14.6644 23.3925C15.8081 23.3925 16.5938 22.6537 16.5938 21.6544C16.5938 20.6194 15.8063 19.8919 14.6644 19.8919C13.5694 19.8919 12.7725 20.6194 12.7725 21.6544C12.7725 22.6537 13.5675 23.3925 14.6644 23.3925Z" fill="#8E00FF" />
            </svg>
        );
    } else if (icon === 'money') {
        iconSvg = (
            <svg width="31" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.875 1.91667C1.875 1.40834 2.07254 0.920823 2.42417 0.561379C2.77581 0.201934 3.25272 0 3.75 0H21.75C22.2473 0 22.7242 0.201934 23.0758 0.561379C23.4275 0.920823 23.625 1.40834 23.625 1.91667H1.875ZM12.5 17.25C13.4946 17.25 14.4484 16.8461 15.1516 16.1272C15.8549 15.4084 16.25 14.4333 16.25 13.4167C16.25 12.4 15.8549 11.425 15.1516 10.7061C14.4484 9.9872 13.4946 9.58333 12.5 9.58333C11.5054 9.58333 10.5516 9.9872 9.84835 10.7061C9.14509 11.425 8.75 12.4 8.75 13.4167C8.75 14.4333 9.14509 15.4084 9.84835 16.1272C10.5516 16.8461 11.5054 17.25 12.5 17.25Z" fill="#8E00FF" />
                <path d="M0 5.75C0 5.24167 0.197544 4.75416 0.549175 4.39471C0.900805 4.03527 1.37772 3.83333 1.875 3.83333H23.625C24.1223 3.83333 24.5992 4.03527 24.9508 4.39471C25.3025 4.75416 25.5 5.24167 25.5 5.75V21.0833C25.5 21.5917 25.3025 22.0792 24.9508 22.4386C24.5992 22.7981 24.1223 23 23.625 23H1.875C1.37772 23 0.900805 22.7981 0.549175 22.4386C0.197544 22.0792 0 21.5917 0 21.0833V5.75ZM5.625 5.75C5.625 6.76666 5.22991 7.74169 4.52665 8.46058C3.82339 9.17947 2.86956 9.58333 1.875 9.58333V17.25C2.86956 17.25 3.82339 17.6539 4.52665 18.3728C5.22991 19.0916 5.625 20.0667 5.625 21.0833H19.875C19.875 20.0667 20.2701 19.0916 20.9734 18.3728C21.6766 17.6539 22.6304 17.25 23.625 17.25V9.58333C22.6304 9.58333 21.6766 9.17947 20.9734 8.46058C20.2701 7.74169 19.875 6.76666 19.875 5.75H5.625Z" fill="#8E00FF" />
            </svg>
        )
    } else if (icon === 'shield') {
        iconSvg = (
            <svg width="31" height="28" viewBox="0 0 25 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 0C11.2679 0 9.20893 0.46375 7.27143 0.98C5.28929 1.505 3.29108 2.12625 2.11608 2.5025C1.62481 2.66149 1.18928 2.95306 0.859503 3.34373C0.529729 3.73439 0.319094 4.20829 0.251795 4.711C-0.81249 12.5458 1.65715 18.3523 4.65358 22.1935C5.92426 23.8367 7.43934 25.2837 9.14822 26.4862C9.8375 26.964 10.4768 27.3297 11.0196 27.58C11.5196 27.811 12.0571 28 12.5 28C12.9429 28 13.4786 27.811 13.9804 27.58C14.6348 27.2683 15.2609 26.9024 15.8518 26.4862C17.5607 25.2837 19.0758 23.8367 20.3464 22.1935C23.3428 18.3523 25.8125 12.5458 24.7482 4.711C24.681 4.20805 24.4705 3.73387 24.1407 3.34291C23.8109 2.95194 23.3753 2.66005 22.8839 2.50075C21.1782 1.95267 19.4593 1.44503 17.7286 0.97825C15.7911 0.4655 13.7321 0 12.5 0ZM12.5 8.75C13.1326 8.74908 13.7451 8.96758 14.229 9.36681C14.7129 9.76604 15.0371 10.3202 15.144 10.9312C15.2509 11.5422 15.1338 12.1706 14.8133 12.705C14.4928 13.2395 13.9896 13.6455 13.3929 13.8512L14.0804 17.3337C14.1054 17.4604 14.1015 17.5909 14.069 17.716C14.0365 17.841 13.9762 17.9574 13.8924 18.0569C13.8086 18.1564 13.7034 18.2365 13.5843 18.2915C13.4652 18.3465 13.3352 18.375 13.2036 18.375H11.7964C11.6649 18.3748 11.5351 18.3461 11.4162 18.291C11.2974 18.2359 11.1924 18.1557 11.1088 18.0562C11.0252 17.9568 10.9651 17.8404 10.9327 17.7155C10.9003 17.5906 10.8964 17.4603 10.9214 17.3337L11.6071 13.8512C11.0104 13.6455 10.5072 13.2395 10.1867 12.705C9.86621 12.1706 9.74905 11.5422 9.85599 10.9312C9.96294 10.3202 10.2871 9.76604 10.771 9.36681C11.2549 8.96758 11.8674 8.74908 12.5 8.75Z" fill="#8E00FF" />
            </svg>
        )
    } else if (icon === 'lock') {
        iconSvg = (
            <svg width="31" height="30" viewBox="0 0 22 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6 6.55887V10.3234C18.767 10.3234 19.8861 10.7841 20.7113 11.6041C21.5364 12.4241 22 13.5363 22 14.696V25.6274C22 26.7871 21.5364 27.8993 20.7113 28.7193C19.8861 29.5393 18.767 30 17.6 30H4.39999C3.23303 30 2.11389 29.5393 1.28873 28.7193C0.463562 27.8993 0 26.7871 0 25.6274V14.696C0 13.5363 0.463562 12.4241 1.28873 11.6041C2.11389 10.7841 3.23303 10.3234 4.39999 10.3234V6.55887C4.39999 4.81937 5.09537 3.15106 6.3331 1.92105C7.57083 0.69101 9.24957 0 11 0C12.7504 0 14.4292 0.69101 15.6669 1.92105C16.9046 3.15106 17.6 4.81937 17.6 6.55887ZM14.1113 3.46698C13.2861 2.64697 12.167 2.18628 11 2.18628C9.83304 2.18628 8.7139 2.64697 7.88873 3.46698C7.06357 4.28702 6.60001 5.3992 6.60001 6.55887V10.3234H15.4V6.55887C15.4 5.3992 14.9364 4.28702 14.1113 3.46698Z" fill="#8E00FF" />
            </svg>
        )
    } else if (icon === 'bell') {
        iconSvg = (
            <svg width="31" height="29" viewBox="0 0 24 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 29C12.9983 29 13.9557 28.6069 14.6616 27.9071C15.2246 27.349 15.5908 26.6324 15.7161 25.8631C15.7691 25.5376 15.4945 25.2686 15.1619 25.2686H8.83813C8.50551 25.2686 8.23094 25.5376 8.28393 25.8631C8.40917 26.6324 8.7754 27.349 9.33835 27.9071C10.0443 28.6069 11.0017 29 12 29ZM14.4223 2.17444C14.123 2.09629 13.9249 1.81519 13.8665 1.51383C13.8514 1.43585 13.8313 1.35873 13.8061 1.28295C13.724 1.03527 13.5904 0.807412 13.4139 0.614066C13.2375 0.420719 13.0221 0.266179 12.7817 0.160412C12.5413 0.0546456 12.2812 0 12.0182 0C11.7552 0 11.4951 0.0546456 11.2547 0.160412C11.0143 0.266179 10.799 0.420719 10.6225 0.614066C10.4461 0.807412 10.3125 1.03527 10.2303 1.28295C10.2051 1.359 10.1849 1.43641 10.1698 1.51467C10.1116 1.8157 9.9143 2.09652 9.61538 2.17487C7.70151 2.67651 5.99081 3.76518 4.73231 5.29184C3.35867 6.95818 2.60817 9.04392 2.6079 11.1959C2.6079 12.8996 1.93878 18.6593 0.0956756 21.9104C-0.196255 22.4254 0.218782 23.4029 0.814664 23.4029H23.1853C23.7812 23.4029 24.1963 22.4254 23.9043 21.9104C22.0612 18.6593 21.4286 12.8996 21.4286 11.1959C21.4286 6.86884 18.4553 3.22724 14.4223 2.17444Z" fill="#8E00FF" />
            </svg>
        )
    } else if (icon === 'arrowDown') {
        iconSvg = (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15C-3.62117e-07 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 3.62117e-07 15 0C6.71573 -3.62117e-07 3.62117e-07 6.71573 0 15ZM15.6415 9.8125C15.6415 9.36377 15.2777 9 14.829 9C14.3803 9 14.0165 9.36377 14.0165 9.8125V16.4729C14.0165 17.3616 12.9438 17.8088 12.3126 17.1832L10.0364 14.9275C9.72123 14.6151 9.21283 14.6162 8.89903 14.93C8.58422 15.2448 8.58421 15.7552 8.89902 16.07L14.1219 21.2929C14.5124 21.6834 15.1456 21.6834 15.5361 21.2929L20.7602 16.0688C21.076 15.7531 21.0805 15.2425 20.7703 14.9213C20.4524 14.5919 19.9261 14.5872 19.6023 14.9109L17.3486 17.1647C16.7186 17.7946 15.6415 17.3485 15.6415 16.4576V9.8125Z" fill="#8E00FF" />
            </svg>
        )
    } else if (icon === 'check') {
        iconSvg = (
            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15ZM22 12.4142C22.3905 12.0237 22.3905 11.3905 22 11C21.6095 10.6095 20.9763 10.6095 20.5858 11L14.4878 17.098C14.2184 17.3674 13.7816 17.3674 13.5122 17.098L10.4142 14C10.0237 13.6095 9.39054 13.6095 9.00002 14C8.60949 14.3905 8.60949 15.0237 9.00002 15.4142L12.5858 19C13.3669 19.7811 14.6332 19.781 15.4142 19L22 12.4142Z" fill="#8E00FF" />
            </svg>
        )
    }

    const containerStyles = `bg-whiteT1 shadow-lg shadow-[#ffffff26] text-purpleT3 hover:bg-white h-16 font-bold py-2 px-4 rounded-full flex justify-center items-center ${sizes[width]} h-${sizes[height]} ${active ? "bg-whiteT1" : "deactivated"} max-w-[500px]`;

    const textStyles = `flex-1 text-${textAlign} w-full ${icon && iconSide === 'right' ? 'ml-7' : 'mr-7'}`;

    const iconStyles = `${iconSide === 'right' ? 'ml-3' : 'mr-3'}`;

    return (
        <button disabled={!active} onClick={action} className={containerStyles}>
            {icon && iconSide === 'left' && <div className={iconStyles}>{iconSvg}</div>}
            <span className={textStyles}>{label}</span>
            {icon && iconSide === 'right' && <div className={iconStyles}>{iconSvg}</div>}
        </button>
    );
};

export default Button;
