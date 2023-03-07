export default {

    NULL_VALUE: "필요한 값이 없습니다.",
    OUT_OF_VALUE: "파라미터 값이 잘못되었습니다.",
    NOT_FOUND: "잘못된 경로입니다.",
    BAD_REQUEST: "잘못된 요청입니다.",


    //! 회원가입 및 로그인
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
    
    
    //! 토큰
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
    
    
    //! 유저
    READ_USER_SUCCESS: "유저 조회 성공",
    READ_ALL_USERS_SUCCESS: "모든 유저 조회 성공",
    DONE_CHECK_USER_NAME: "유저 이름 체크 완료",
    UPDATE_USER_SUCCESS: "유저 수정 성공",
    DELETE_USER_SUCCESS: "유저 탈퇴 성공",
    DELETE_USER_FAIL: "유저 탈퇴 실패",
    NO_USER: "탈퇴했거나 가입하지 않은 유저입니다.",
    SEARCH_USER_FAIL: "유저 서치 실패",
    SEARCH_USER_SUCCESS: "유저 서치 성공",
    SUCCESS_UPDATE_USER_PROFILE: "회원가입 후 유저 프로필 수정 성공",
    FAIL_UPDATE_USER_PROFILE: "회원가입 후 유저 프로필 수정 실패",
    SUCCESS_UPDATE_USER_PASSWORD: "유저 비밀번호 변경 성공",
    FAIL_UPDATE_USER_PASSWORD: "유저 비밀번호 변경 실패",
    FAIL_CREATE_AUTH: "auth 생성 실패",
    
    
    //! 이메일 
    EMAIL_CHECK_DONE: "이메일 중복 검사 완료",
    ALREADY_EXISTS_EMAIL: "중복된 이메일입니다",
    MAKE_VERIFICATION_CODE_FAIL: "인증코드 생성 실패",
    REMAKE_VERIFICATION_CODE_FAIL: "인증코드 재생성 실패",
    CREATE_VERIFICATION_CODE_SUCCESS: "인증코드 생성 성공",
    RECREATE_VERIFICATION_CODE_SUCCESS: "인증코드 재생성 성공",
    CODE_VERIFY_SUCCESS: "인증코드 인증 성공",
    CODE_VERIFY_FAIL: "인증코드 인증 실패",
    SEND_VERIFY_MAIL_FIRST: "인증메일 먼저 전송받은 후 인증하세요",
    INVALID_VERIFICATION_CODE: "유효 인증 시간 경과 또는 올바르지 않은 인증코드 입력",
    PASSWORD_RESET_MAIL_SEND_SUCCESS: "비밀번호 재설정 메일 전송 성공",
    PASSWORD_RESET_MAIL_SEND_FAIL: "비밀번호 재설정 메일 전송 실패",
    PASSWORD_RESET_TIME_PASSED: "비밀번호 초기화 링크 3시간 초과",
    

    //! 파일 업로드 관련
    INVALID_IMAGE_FILE_TYPE: "가능한 이미지 파일 형식(.png/.jpg/.jpeg)을 벗어남",
    INAVLID_AUDIO_FILE_TYPE: "가능한 오디오 파일 형식(.mp3/.wav)을 벗어남",
    NOT_IMAGE_FILE: "이미지 파일이 아닙니다",
    NOT_AUDIO_FILE: "오디오 파일이 아닙니다",
    IMAGE_FILE_TOO_LARGE: "이미지파일(5MB) 크기 초과",
    AUDIO_FILE_TOO_LARGE: "오디오파일(100MB) 크기 초과",
    UPLOAD_TRACK_FILE_SUCCESS: "트랙 게시글 업로드 성공",
    UPLOAD_TRACK_FILE_FAIL: "트랙 게시글 업로드 실패",


    //! 게시글 관련 
    UPDATE_TRACK_SUCCESS: "게시글 수정 성공",
    UPDATE_TRACK_FAIL: "게시글 수정 실패",
    UPDATE_TRACK_CLOSED_SUCCESS: "게시글 마감 업데이트 성공",
    UPDATE_TRACK_CLOSED_FAIL: "게시글 마감 업데이트 실패",
    DELETE_TRACK_SUCCESS: "게시글 삭제 성공",
    DELETE_TRACK_FAIL: "게시글 삭제 실패",
    GET_TRACK_INFO_SUCCESS: "게시글 정보 조회 성공",
    GET_TRACK_INFO_FAIL: "게시글 정보 조회 실패",
    GET_TRACK_LIST_SUCCESS: "게시글 조회 성공",
    GET_TRACK_LIST_FAIL: "게시글 조회 실패",
    GET_TRACK_FILE_SUCCESS: "게시글 파일 다운로드 성공",
    GET_TRACK_FILE_FAIL: "게시글 파일 다운로드 실패",
    NON_EXISTS_PRODUCER: "존재하지 않는 프로듀서",
    NON_EXISTS_VOCAL: "존재하지 않는 보컬",
    PRODUCER_BEAT_UNMATCH: "해당 프로듀서의 게시글이 아님",
    NO_AUDIO_FILE: "오디오 파일이 존재하지 않음",
    S3_CANNOT_FIND_AUDIO_FILE_OBJEUPDATE_TRACK_FAILCT: "해당 버킷에서 오디오 객체를 찾을 수 없음",
    S3_CANNOT_FIND_IMAGE_FILE_OBJECT: "해당 버킷에서 이미지 객체를 찾을 수 없음",


    //! 댓글 관련
    GET_COMMENT_LIST_SUCCESS: "댓글 조회 성공",
    GET_COMMENT_LIST_FAIL: "댓글 조회 실패",
    UPLOAD_COMMENT_SUCCESS: "댓글 업로드 성공",
    UPLOAD_COMMENT_FAIL: "댓글 업로드 실패",
    UPDATE_COMMENT_SUCCESS: "댓글 수정 성공",
    UPDATE_COMMENT_FAIL: "댓글 수정 실패",
    DELETE_COMMENT_SUCCESS: "댓글 삭제 성공",
    DELETE_COMMENT_FAIL: "댓글 삭제 실패",
    INVALID_BEAT_ID: "존재하지 않는 게시글",
    INVALID_COMMENT: "올바르지 않은 보컬의 댓글",


    //! 포트폴리오 관련
    NOT_PRODUCER: "프로듀서 아님",
    NOT_VOCAL: "보컬 아님",
    PRODUCER_TITLE_NOT_FOUND: "프로듀서 타이틀이 존재하지 않음",
    VOCAL_TITLE_NOT_FOUND: "보컬 타이틀이 존재하지 않음",
    UPLOAD_PRODUCER_PORTFOLIO_SUCCESS: "프로듀서 포트폴리오 업로드 성공",
    UPLOAD_PRODUCER_PORTFOLIO_FAIL: "프로듀서 포트폴리오 업로드 실패",
    UPLOAD_VOCAL_PORTFOLIO_SUCCESS: "보컬 포트폴리오 업로드 성공",
    UPLOAD_VOCAL_PORTFOLIO_FAIL: "보컬 포트폴리오 업로드 실패",
    UPDATE_PRODUCER_PORTFOLIO_SUCCESS: "프로듀서 포트폴리오 수정 성공",
    UPDATE_PRODUCER_PORTFOLIO_FAIL: "프로듀서 포트폴리오 수정 실패",
    UPDATE_VOCAL_PORTFOLIO_SUCCESS: "보컬 포트폴리오 수정 성공",
    UPDATE_VOCAL_PORTFOLIO_FAIL: "보컬 포트폴리오 수정 실패",
    DELETE_PRODUCER_PORTFOLIO_SUCCESS: "프로듀서 포트폴리오 삭제 성공",
    DELETE_PRODUCER_PORTFOLIO_FAIL: "프로듀서 포트폴리오 삭제 실패",
    DELETE_VOCAL_PORTFOLIO_SUCCESS: "보컬 포트폴리오 삭제 성공",
    DELETE_VOCAL_PORTFOLIO_FAIL: "보컬 포트폴리오 삭제 실패",
    INVALID_PRODUCER_PORTFOLIO: "유효하지 않은 프로듀서의 포트폴리오",
    INVALID_VOCAL_PORTFOLIO: "유효하지 않은 보컬의 포트폴리오",
    INVALID_USER_TITLE: "유효하지 않은 사용자의 타이틀",


    //! 프로필 관련
    GET_USER_INFORMATION_SUCCESS: "유저관련 정보 조회 성공",
    GET_USER_INFORMATION_FAIL: "유저관련 정보 조회 실패",
    GET_PRODUCER_PROFILE_SUCCESS: "프로듀서 프로필 조회 성공",
    GET_PRODUCER_PROFILE_FAIL: "프로듀서 프로필 조회 실패",
    GET_VOCAL_PROFILE_SUCCESS: "보컬 프로필 조회 성공",
    GET_VOCAL_PROFILE_FAIL: "보컬 프로필 조회 실패",
    GET_PRODUCER_BEATS_SUCCESS: "프로듀서 보컬서칭 조회 성공",
    GET_PRODUCER_BEATS_FAIL: "프로듀서 보컬서칭 조회 실패",
    UPDATE_PRODUCER_PROFILE_SUCCESS: "프로듀서 프로필 수정 성공",
    UPDATE_PRODUCER_PROFILE_FAIL: "프로듀서 프로필 수정 실패",
    UPDATE_VOCAL_PROFILE_SUCCESS: "보컬 프로필 수정 성공",
    UPDATE_VOCAL_PROFILE_FAIL: "보컬 프로필 수정 실패",
    UPDATE_PRODUCER_TITLE_SUCCESS: "프로듀서 타이틀 수정 성공",
    UPDATE_PRODUCER_TITLE_FAIL: "프로듀서 타이틀 수정 실패",
    UPDATE_PRODUCER_OLD_TITLE_FAIL: "프로듀서 현재 타이틀 포트폴리오 변경 실패",
    UPDATE_PRODUCER_NEW_TITLE_FAIL: "프로듀서 타이틀이 될 포트폴리오 변경 실패",
    UPDATE_VOCAL_OLD_TITLE_FAIL: "보컬 현재 타이틀 포트폴리오 변경 실패",
    UPDATE_VOCAL_NEW_TITLE_FAIL: "보컬 타이틀이 될 포트폴리오 변경 실패",
    UPDATE_VOCAL_TITLE_SUCCESS: "보컬 타이틀 수정 성공",
    UPDATE_VOCAL_TITLE_FAIL: "보컬 타이틀 수정 실패",
    INVALID_PRODUCER: "유효하지 않은 프로듀서",
    INVALID_VOCAL: "유효하지 않은 보컬",


    //! 보컬검색 관련
    GET_VOCAL_LIST_SUCCESS: "보컬 필터링 검색 성공",
    GET_VOCAL_LIST_FAIL: "보컬 필터링 검색 실패",


    //! S3 객체 관련
    DELETE_S3_TRACK_AUDIO_AND_IMAGE_OBJECT_FAIL: "S3 게시글 오디오, 이미지 객체 삭제 실패",
    DELETE_S3_COMMENT_OBJECT_FAIL: "S3 댓글 오디오 객체 삭제 실패",
    DELETE_S3_PRODUCER_PORTFOLIO_AUDIO_AND_IMAGE_OBJECT_FAIL: "S3 프로듀서 포트폴리오 오디오, 이미지 객체 삭제 실패",
    DELETE_S3_VOCAL_PORTFOLIO_AUDIO_AND_IMAGE_OBJECT_FAIL: "S3 보컬 포트폴리오 오디오, 이미지 객체 삭제 실패",


    //! 페이지네이션 변수 관련
    INVALID_PAGINATION_PARAMETERS: "유효하지 않은 페이지네이션 변수",


    //! 서버 내 오류
    INTERNAL_SERVER_ERROR: "서버 내 오류",

};