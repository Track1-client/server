export default {
    NULL_VALUE: "필요한 값이 없습니다.",
    OUT_OF_VALUE: "파라미터 값이 잘못되었습니다.",
    NOT_FOUND: "잘못된 경로입니다.",
    BAD_REQUEST: "잘못된 요청입니다.",
  
    // 회원가입 및 로그인
    SIGNUP_SUCCESS: "회원 가입 성공",
    SIGNUP_FAIL: "회원 가입 실패",
    NEED_TO_LOGIN: "새롭게 로그인 필요",
    SIGNIN_SUCCESS: "로그인 성공",
    SIGNIN_FAIL: "로그인 실패",
    SIGNOUT_SUCCESS: "로그아웃 성공",
    SIGNOUT_FAIL: "로그아웃 실패",
    ALREADY_IN_USE_ID: "이미 존재하는 아이디입니다.",
    ALREADY_IN_USE_NAME: "이미 존재하는 닉네임입니다.",
    INVALID_ID: "존재하지 않는 아이디입니다.",
    INCORRECT_PASSWORD: "잘못된 비밀번호입니다.",
    SUCCESS_UPDATE_USER_PROFILE: "유저 프로필 수정 성공",
    FAIL_UPDATE_USER_PROFILE: "유저 프로필 수정 실패",

    // 토큰
    CREATE_TOKEN_SUCCESS: "토큰 재발급 성공",
    EXPIRED_ACCESS_TOKEN: "Access 토큰이 만료되었습니다.",
    EXPIRED_REFRESH_TOKEN: "Refresh 토큰이 만료되었습니다.",
    NON_EXPIRED_ACCESS_TOKEN: "Access 토큰이 만료되지 않았습니다.",
    EXPIRED_ALL_TOKEN: "모든 토큰이 만료되었습니다.",
    INVALID_ACCESS_TOKEN: "유효하지 않은 Access 토큰입니다.",
    INVALID_REFRESH_TOKEN: "유효하지 않은 Refresh 토큰입니다.",
    VALID_TOKEN: "유효한 토큰입니다.",
    EMPTY_ACCESS_TOKEN: "Access 토큰 값이 없습니다.",
    EMPTY_REFRESH_TOKEN: "Refresh 토큰 값이 없습니다.",
  
    // 유저
    READ_USER_SUCCESS: "유저 조회 성공",
    READ_ALL_USERS_SUCCESS: "모든 유저 조회 성공",
    DONE_CHECK_USER_NAME: "유저 이름 체크 완료",
    UPDATE_USER_SUCCESS: "유저 수정 성공",
    DELETE_USER_SUCCESS: "유저 탈퇴 성공",
    DELETE_USER_FAIL: "유저 탈퇴 실패",
    NO_USER: "탈퇴했거나 가입하지 않은 유저입니다.",
    SEARCH_USER_FAIL: "유저 서치 실패",
    SEARCH_USER_SUCCESS: "유저 서치 성공",

    // 이메일 
    ALREADY_EXISTS_EMAIL: "중복된 이메일입니다",
    MAKE_VERIFICATION_CODE_FAIL: "인증코드 생성 실패",
    REMAKE_VERIFICATION_CODE_FAIL: "인증코드 재생성 실패",
    CREATE_VERIFICATION_CODE_SUCCESS: "인증코드 생성 성공",
    RECREATE_VERIFICATION_CODE_SUCCESS: "인증코드 재생성 성공",
    CODE_VERIFY_SUCCESS: "인증코드 인증 성공",
    CODE_VERIFY_FAIL: "인증코드 인증 실패",
    SEND_VERIFY_MAIL_FIRST: "인증메일 먼저 전송받은 후 인증하세요",
    VALID_AUTH_TIME_PASSED: "유효 인증 시간이 지났습니다",
    
    // 파일 업로드 관련
    INVALID_IMAGE_FILE_TYPE: "가능한 이미지 파일 형식(.png/.jpg/.jpeg)을 벗어남",
    INAVLID_AUDIO_FILE_TYPE: "",
    NOT_IMAGE_FILE: "이미지 파일이 아닙니다",
    NOT_AUDIO_FILE: "",
  
    // 서버 내 오류
    INTERNAL_SERVER_ERROR: "서버 내 오류",
  };