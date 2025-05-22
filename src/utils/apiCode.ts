export enum CoreRequestCode {
    winSys, // Ерөнхий тохиргоо
    winBroker, // Байгууллага
    winBrokerBrch, // Байгууллагын салбар
    winOrderType, // Захиалгын төрөл
    winOrderCond, // Биелэх нөхцөл
    winCompany, // Компани
    winStockType, // Үнэт цаасны төрөл
    winStock, // Үнэт цаасны бүртгэл
    winSegment, // Сегмент
    winCountry, // Улс
    winCity, // Аймаг/хот
    winDist, // Сум/дүүрэг
    winSubDist, // Баг/хороо
    winLang, // Хэл
    winGender, // Хүйс
    winNation, // Иргэний харъяалал
    winEdu, // Боловсрол
    winAddrType, // Хаягийн төрөл
    winSignType, // Зургийн төрөл
    winRelType, // Хамааралын төрөл
    winIndu, // Үйл ажиллагааны чиглэл
    winInduSub, // Үйл ажиллагааны дэд чиглэл
    winLvl, // Нууцлал
    winAcntType, // Дансны төрөл
    winUser, // Хэрэглэгчийн лавлагаа
    winRole, // Эрх
    winGrp, // Эрхийн бүлэг
    winCust, // Шинэ харилцагч
    winCustLst, // Харилцагчийн лавлагаа
    winAcnt, // Шинэ данс
    winAcntLst, // Дансны лавлагаа
    winOrder, // Шинэ захиалга
    winJr, // Захиалгын жагсаалт
    winOrderDone, // Захиалга биелүүлэх
    winAcntStockLst, // Данс үнэт цаас
    winCustRelLst, // Харилцагчийн хамаарал
    winCustSignLst, // Харилцагчийн зураг
    winCustAddrLst, // Харилцагчийн хаяг
    winLoginLst, // Виртуал харилцагч
    winCash, // Мөнгө хүсэх өргөдөл
    winCashLst, // Мөнгө хүсэх өргөдлийн лавлагаа
    winSettlementBroker, // БДК-ийн Сеттлемент
    winStatementCust, // Харилцагчийн дансны хуулга
    winStatementBroker, // Брокерийн дансны хуулга
    winSlipMoney, // Мөнгө хүсэх өргөдлийн баримт
    winSettlementCust, // Харилцагчийн Сеттлемент
    winTax, // Данс нээсэн хураамж
    winTaxLst, // Хураамжийн жагсаалт
    winSlipTax, // Данс нээсэн хураамжийн баримт
    winContract, // Үнэт цаасны дансны болон захиалгын ерөнхий гэрээ
    winSecurities, // Үнэт цаасны хуулга
    winRisk, // Арилжааны лимит, эрсдэлийн тооцоолол
    winPending, // Захиалгын жагсаалт - Тайлан
    winDealer, // Диелерийн даалгавар
    winCommissions, // Шимтгэлийн тайлан
    winCustomerOrder, // Харилцагчийн захиалгын дэлгэрэнгүй
    winTradeDown, // Арилжааны мэдээлэл татах
    winCustFeeLst, // Харилцагчийн шимтгэл
    winLogin2GrpLst, // Виртуал харилцагчийн эрх
    winUsr2Grp, // Хэрэглэгчийн эрх
    winGrp2Role, // Бүлгийн эрх
    winCustUboLst, // Хувь нийлүүлэгч
    winDist2City, // Аймгийн сумууд
    winTaxRpt, // Орлого хүлээн авсан мэдээ
    winAcntBrief, // Харилцагчийн данс нээсэн тухай мэдээлэл
    winRptTrade, // Арилжааны мэдээ
    winAcntStatistic, // Данс нээсэн тоо
    winPass, // Нууц үгээ солих
    winStockLst, // Арилжааны лавлагаа
    winPosition, // Позицийн тайлан
    winCustAddr, // Харилцагчийн хаяг нэмэх,засах,устгах
    winCustSign, // Харилцагчийн зураг нэмэх,засах,устгах
    winCustFee, // Харилцагчийн шимтгэл нэмэх,засах,устгах
    winCustRel, // Харилцагчийн хамаарал нэмэх,засах,устгах
    winCustUbo, // Хувь нийлүүлэгч нэмэх,засах,устгах
    winAcntStock, // Данс үнэт цаас нэмэх,засах,устгах
    winLogin, // Виртуал харилцагч нэмэх,засах,устгах
    winLogin2Grp, // Виртуал харилцагчийн эрх нэмэх,засах,устгах
    winTradePrice, // Үнэт цаасны ханш шинэчлэх
    winFile, // Файл боловсруулах
    winFileAcnt, // Шинээр нээгдсэн дансны төлөв солих
    winFileNon, // Арилжааны бус гүйлгээг татах
    winFileSettlement, // Сеттлемент файл татах
    winOrderExpCancel, // Хугацаа дууссан захиалга цуцлагдах
    winCustDel, // Харилцагч устгах
    winCustAddrDel, // Харилцагчийн хаяг устгах
    winCustSignDel, // Харилцагчийн гарын үсэг устгах
    winCustFeeDel, // Харилцагчийн шимтгэл устгах
    winCustRelDel, // Харилцагчийн хамаарал устгах
    winCustUboDel, // Харилцагчийн хувь нийлүүлэгч устгах
    winAcntDel, // Данс устгах
    winAcntStockDel, // Дансны үнэт цаас устгах
    winOrderDel, // Захиалга устгах
    winOrderEdit, // Захиалга засах
    winOrderCheck, // Захиалга хянах
    winTaxCancel, // Хураамж цуцлах
    winAgrOnline, // Интернет захиалгын гэрээ
    winSlip, // Захиалгын баримт хэвлэх
    winFileTrade, // Ханшийн файл татах
    winLog, // Үйлдлийн түүх
    winCustStock, // Үнэт цаасны лавлагаа
    winEvent, // Үйл явдал
    winTasks, // Ажил хэрэг
    winSql, // Динамик лавлагаа
    winSqlAdmin, // Динамик лавлагаа нэмэх, засах, устгах
    winFixNew, // MIT Системд захиалга хийх
    winFixCancel, // MIT Системд захиалга цуцлах
    winFixAmend, // MIT Системд захиалга өөрчлөх
    winFixMsg, // MIT FIX Захиалгын Мессежүүд
    winCode, // Кодын лавлах
    winFixTrade, // MIT Биелэсэн хэлцэл
    winFixBlotter, // MIT Хэлцэл
    winFee, // Шимтгэл
    winTaxEdit, // Хураамж засах
    winCashEdit, // Мөнгө хүсэх өргөдөл зөвшөөрөх
    winSignedDoc, // Цахим гарын үсгээр баталгаажуулах
    winCSDMoney, // ҮЦТА, ҮЦТХТ Мөнгө хүсэх өргөдөл
    winCSDMoneyLst, // ҮЦТА, ҮЦТХТ Мөнгө хүсэх өргөдлийн лавлагаа
    winCSDMoneyCancel, // ҮЦТА, ҮЦТХТ Мөнгө хүсэх өргөдөл цуцлах
    winSlipCSD, // ҮЦТА, ҮЦТХТ Мөнгө хүсэх өргөдөл хэвлэх
    winOnCustlst, // Онлайнаар бүртгэсэн харилцагчийн мэдээлэл
    winSqlDB, // Скрипт
    winStatistic, // Статистик
    winDashboard, // Дашборд
    winTaskAdd, // Ажил хэрэг төлөвлөх
    winMarketingMail, // Мэйл илгээх
    winMarketingSMS, // Смс илгээх
    winMarketingMsg, // Мэдэгдэл илгээх
    winLeadAssign, // Ажилтанд хуваарилах
    winLeadLst, // Боломжит харилцагч
    winLeadCust, // Харилцагчийн мэдээлэл
    winLeadDetail, // Lead нэмэх
    winLead, // Харилцагчийн жагсаалт
    winMarketing, // Маркетинг
    winLeadSales, // Борлуулалт, гүйцэтгэл
    winNBO, // Бүтээгдэхүүн, үйлчилгээ санал болгох
    appBDS, // Рубик BDS систем
    appTrading, // Рубик Trading систем
    appCRM, // Рубик CRM систем
    appBSC, // Рубик BSC систем
    winUpload, // Файлаас мэдээлэл татах
    winCallsLst, // Харилцагчийн дуудлагын жагсаалт
    winCalls, // Харилцагчийн дуудлага бүртгэх
    winCust360 // Харилцагчийн 360
  }