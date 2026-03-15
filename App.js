import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
  ScrollView,
} from 'react-native';

// ─────────────────────────────────────
// 앱 전체 (네비게이션 없이 useState로 화면 전환)
// ─────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('Splash');

  const navigate = (screenName) => setScreen(screenName);

  const renderScreen = () => {
    switch (screen) {
      case 'Splash':     return <SplashScreen navigate={navigate} />;
      case 'Onboarding': return <OnboardingScreen navigate={navigate} />;
      case 'Main':       return <MainScreen navigate={navigate} />;
      case 'Scan':       return <ScanScreen navigate={navigate} />;
      case 'Loading':    return <LoadingScreen navigate={navigate} />;
      case 'Result':     return <ResultScreen navigate={navigate} />;
      default:           return <MainScreen navigate={navigate} />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      {renderScreen()}
    </View>
  );
}

// ─────────────────────────────────────
// 스플래시 화면
// ─────────────────────────────────────
function SplashScreen({ navigate }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
    ]).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, { toValue: 0, duration: 600, useNativeDriver: true })
        .start(() => navigate('Onboarding'));
    }, 2000);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ scale: scaleAnim }], alignItems: 'center', gap: 12 }}>
        <View style={{ width: 80, height: 80, borderRadius: 20, backgroundColor: '#1e1e1e', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', gap: 5 }}>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <View style={{ width: 18, height: 18, borderRadius: 3, borderWidth: 2, borderColor: 'rgba(226,226,226,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 8, height: 8, borderRadius: 1.5, backgroundColor: '#e2e2e2' }} />
              </View>
              <View style={{ width: 18, height: 18, borderRadius: 3, borderWidth: 2, borderColor: 'rgba(226,226,226,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 8, height: 8, borderRadius: 1.5, backgroundColor: '#e2e2e2' }} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <View style={{ width: 18, height: 18, borderRadius: 3, borderWidth: 2, borderColor: 'rgba(226,226,226,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 8, height: 8, borderRadius: 1.5, backgroundColor: '#e2e2e2' }} />
              </View>
              <View style={{ width: 18, height: 18, justifyContent: 'center', gap: 2 }}>
                <View style={{ width: 16, height: 2, borderRadius: 1, backgroundColor: 'rgba(226,226,226,0.4)' }} />
                <View style={{ width: 10, height: 2, borderRadius: 1, backgroundColor: 'rgba(226,226,226,0.4)' }} />
                <View style={{ width: 16, height: 2, borderRadius: 1, backgroundColor: 'rgba(226,226,226,0.4)' }} />
              </View>
            </View>
          </View>
        </View>
        <Text style={{ fontSize: 16, fontWeight: '500', color: '#fff', letterSpacing: 3 }}>TAG CAP</Text>
        <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: 0.3 }}>scan any tag. find the best price.</Text>
      </Animated.View>
    </View>
  );
}

// ─────────────────────────────────────
// 온보딩 화면
// ─────────────────────────────────────
function OnboardingScreen({ navigate }) {
  const [currentPage, setCurrentPage] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const pages = [
    { title: '이거 진짜\n저렴한 건가요?', sub: '해외 매장 가격표만 보고\n구매하면 손해볼 수 있어요', illust: 'price' },
    { title: '태그 하나로\n전세계 가격 비교', sub: '35개 글로벌 사이트를\n한 번에 검색해요', illust: 'scan' },
    { title: '배송비 관세까지\n다 포함된 최저가', sub: '숨겨진 비용 없이\n진짜 최저가를 알려드려요', illust: 'save' },
  ];

  const goNext = () => {
    if (currentPage < pages.length - 1) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -20, duration: 200, useNativeDriver: true }),
      ]).start(() => {
        setCurrentPage(currentPage + 1);
        slideAnim.setValue(20);
        Animated.parallel([
          Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
          Animated.timing(slideAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]).start();
      });
    } else {
      Animated.timing(fadeAnim, { toValue: 0, duration: 500, useNativeDriver: true })
        .start(() => navigate('Main'));
    }
  };

  const renderIllust = (type) => {
    if (type === 'price') return (
      <View style={{ alignItems: 'center', gap: 16 }}>
        <View style={{ width: 130, height: 80, backgroundColor: '#1c1c1f', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 12, alignItems: 'center', justifyContent: 'center', gap: 3 }}>
          <Text style={{ fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: 0.8 }}>SPECIAL PRICE</Text>
          <Text style={{ fontSize: 28, fontWeight: '500', color: '#fff', letterSpacing: -0.5 }}>¥20,000</Text>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 2 }}>
            <Text style={{ fontSize: 8, color: 'rgba(255,255,255,0.3)' }}>LIMITED OFFER</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
          <Text style={{ fontSize: 28, fontWeight: '500', color: 'rgba(255,255,255,0.6)' }}>?</Text>
          <Text style={{ fontSize: 20, fontWeight: '500', color: 'rgba(255,255,255,0.3)' }}>?</Text>
          <Text style={{ fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.15)' }}>?</Text>
        </View>
      </View>
    );
    if (type === 'scan') return (
      <View style={{ alignItems: 'center', gap: 16 }}>
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#1c1c1f', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ alignItems: 'center', gap: 5 }}>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <View style={{ width: 20, height: 20, borderRadius: 3, borderWidth: 2, borderColor: 'rgba(226,226,226,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 9, height: 9, borderRadius: 1.5, backgroundColor: '#e2e2e2' }} />
              </View>
              <View style={{ width: 20, height: 20, borderRadius: 3, borderWidth: 2, borderColor: 'rgba(226,226,226,0.7)', alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 9, height: 9, borderRadius: 1.5, backgroundColor: '#e2e2e2' }} />
              </View>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {['🇺🇸 USA', '🇰🇷 Korea', '🇯🇵 Japan'].map((c, i) => (
            <View key={i} style={{ backgroundColor: i === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: i === 1 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 }}>
              <Text style={{ fontSize: 11, color: i === 1 ? '#e2e2e2' : 'rgba(255,255,255,0.3)', fontWeight: '500' }}>{c}</Text>
            </View>
          ))}
        </View>
      </View>
    );
    if (type === 'save') return (
      <View style={{ alignItems: 'center', gap: 16 }}>
        <View style={{ backgroundColor: '#1c1c1f', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)', borderRadius: 16, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 200, gap: 16 }}>
          <View>
            <Text style={{ fontSize: 9, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 2 }}>절약 가능</Text>
            <Text style={{ fontSize: 26, fontWeight: '500', color: '#fff', letterSpacing: -0.8 }}>₩62,000</Text>
          </View>
          <View style={{ backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6 }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: '#e2e2e2' }}>46%</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', gap: 6 }}>
          {['배송비 포함', '관세 포함', '실시간'].map((t, i) => (
            <View key={i} style={{ backgroundColor: i === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: i === 1 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 }}>
              <Text style={{ fontSize: 11, color: i === 1 ? '#e2e2e2' : 'rgba(255,255,255,0.3)', fontWeight: '500' }}>{t}</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'space-between', paddingTop: 60, paddingBottom: 50, paddingHorizontal: 28 }}>
      <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => navigate('Main')}>
        <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.25)' }}>건너뛰기</Text>
      </TouchableOpacity>
      <Animated.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        {renderIllust(pages[currentPage].illust)}
      </Animated.View>
      <Animated.View style={{ alignItems: 'center', gap: 10, paddingHorizontal: 8, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <Text style={{ fontSize: 24, fontWeight: '500', color: '#fff', textAlign: 'center', letterSpacing: -0.5, lineHeight: 32 }}>{pages[currentPage].title}</Text>
        <Text style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', textAlign: 'center', lineHeight: 22 }}>{pages[currentPage].sub}</Text>
      </Animated.View>
      <View style={{ width: '100%', alignItems: 'center', gap: 14, marginTop: 24 }}>
        <View style={{ flexDirection: 'row', gap: 6, alignItems: 'center' }}>
          {pages.map((_, i) => (
            <View key={i} style={{ width: i === currentPage ? 18 : 6, height: 6, borderRadius: 3, backgroundColor: i === currentPage ? '#e2e2e2' : 'rgba(255,255,255,0.18)' }} />
          ))}
        </View>
        <TouchableOpacity style={{ width: '100%', backgroundColor: '#e2e2e2', borderRadius: 14, padding: 14, alignItems: 'center' }} onPress={goNext}>
          <Text style={{ fontSize: 14, fontWeight: '500', color: '#111' }}>{currentPage === pages.length - 1 ? '시작하기' : '다음'}</Text>
        </TouchableOpacity>
        {currentPage === pages.length - 1 && (
          <TouchableOpacity style={{ width: '100%', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: 10, alignItems: 'center' }} onPress={() => navigate('Main')}>
            <Text style={{ fontSize: 12, fontWeight: '500', color: 'rgba(255,255,255,0.3)' }}>로그인</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// ─────────────────────────────────────
// 메인 화면
// ─────────────────────────────────────
function MainScreen({ navigate }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    scaleAnim.setValue(1);
  }, []);

  const triggerEffect = () => {
    scaleAnim.setValue(1);
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.9, duration: 80, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 12, duration: 550, useNativeDriver: true }),
    ]).start();

    const newCoins = ['$', '¥', '€', '₩'].map((label, i) => ({
      id: Date.now() + i, label,
      anim: new Animated.Value(0),
      left: 20 + i * 30,
    }));

    setCoins(newCoins);

    newCoins.forEach((coin, i) => {
      setTimeout(() => {
        Animated.timing(coin.anim, { toValue: 1, duration: 800, useNativeDriver: true })
          .start(() => setCoins((prev) => prev.filter((c) => c.id !== coin.id)));
      }, i * 60);
    });

    setTimeout(() => navigate('Scan'), 450);
  };

  return (
    <View style={mainStyles.container}>
      <View style={mainStyles.topSection}>
        <Text style={mainStyles.appName}>TAG CAP</Text>
        <Text style={mainStyles.tagline}>Get <Text style={mainStyles.taglineGray}>Money</Text></Text>
        <Text style={mainStyles.subText}>scan any tag. find the best price.</Text>
      </View>
      <View style={mainStyles.coinArea}>
        {coins.map((coin) => (
          <Animated.Text key={coin.id} style={[mainStyles.coin, {
            left: coin.left,
            opacity: coin.anim.interpolate({ inputRange: [0, 0.6, 1], outputRange: [1, 1, 0] }),
            transform: [
              { translateY: coin.anim.interpolate({ inputRange: [0, 1], outputRange: [0, -60] }) },
              { scale: coin.anim.interpolate({ inputRange: [0, 1], outputRange: [1, 0.5] }) },
            ],
          }]}>{coin.label}</Animated.Text>
        ))}
      </View>
      <View style={mainStyles.middleSection}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity style={mainStyles.scanButton} onPress={triggerEffect} activeOpacity={0.9}>
            <View style={mainStyles.qrContainer}>
              <View style={mainStyles.qrRow}>
                <View style={mainStyles.qrBlock}><View style={mainStyles.qrInner} /></View>
                <View style={{ width: 16 }} />
                <View style={mainStyles.qrBlock}><View style={mainStyles.qrInner} /></View>
              </View>
              <View style={{ height: 8 }} />
              <View style={mainStyles.qrRow}>
                <View style={mainStyles.qrBlock}><View style={mainStyles.qrInner} /></View>
                <View style={{ width: 16 }} />
                <View style={mainStyles.qrDataBlock}>
                  <View style={mainStyles.qrDataLine} />
                  <View style={[mainStyles.qrDataLine, { width: 10, marginTop: 2 }]} />
                  <View style={[mainStyles.qrDataLine, { marginTop: 2 }]} />
                </View>
              </View>
            </View>
            <Text style={mainStyles.scanLabel}>SCAN TAG</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
      <View style={mainStyles.badgeRow}>
        {['글로벌 최저가', '배송비 포함', '관세 자동계산'].map((text) => (
          <View key={text} style={mainStyles.badge}>
            <Text style={mainStyles.badgeText}>{text}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─────────────────────────────────────
// 스캔 화면
// ─────────────────────────────────────
function ScanScreen({ navigate }) {
  const scanLineAnim = useRef(new Animated.Value(0)).current;
  const ring1Anim = useRef(new Animated.Value(0)).current;
  const ring2Anim = useRef(new Animated.Value(0)).current;
  const ring3Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(Animated.sequence([
      Animated.timing(scanLineAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
      Animated.timing(scanLineAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
    ])).start();

    const startRing = (anim, delay) => setTimeout(() => {
      Animated.loop(Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 2400, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])).start();
    }, delay);

    startRing(ring1Anim, 0);
    startRing(ring2Anim, 600);
    startRing(ring3Anim, 1200);
  }, []);

  const ringStyle = (anim, size) => ({
    position: 'absolute', width: size, height: size, borderRadius: size / 2,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    opacity: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.5, 0.3, 0] }),
    transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.75, 1.1] }) }],
  });

  return (
    <View style={scanStyles.container}>
      <View style={scanStyles.topBar}>
        <TouchableOpacity style={scanStyles.iconBtn} onPress={() => navigate('Main')}>
          <Text style={scanStyles.iconBtnText}>✕</Text>
        </TouchableOpacity>
        <Text style={scanStyles.title}>Tag Cap</Text>
        <TouchableOpacity style={scanStyles.iconBtn}>
          <Text style={scanStyles.iconBtnText}>⚡</Text>
        </TouchableOpacity>
      </View>
      <View style={scanStyles.scanArea}>
        <Animated.View style={ringStyle(ring1Anim, 110)} />
        <Animated.View style={ringStyle(ring2Anim, 150)} />
        <Animated.View style={ringStyle(ring3Anim, 190)} />
        <View style={scanStyles.scanFrame}>
          <View style={[scanStyles.corner, scanStyles.cornerTL]} />
          <View style={[scanStyles.corner, scanStyles.cornerTR]} />
          <View style={[scanStyles.corner, scanStyles.cornerBL]} />
          <View style={[scanStyles.corner, scanStyles.cornerBR]} />
          <Animated.View style={[scanStyles.scanLine, {
            opacity: scanLineAnim.interpolate({ inputRange: [0, 0.1, 0.9, 1], outputRange: [0, 1, 1, 0] }),
            transform: [{ translateY: scanLineAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 170] }) }],
          }]} />
        </View>
      </View>
      <View style={scanStyles.hintArea}>
        <Text style={scanStyles.hintText}>태그에 카메라를 대세요{'\n'}<Text style={scanStyles.hintHighlight}>자동으로 인식</Text>됩니다</Text>
      </View>
      <View style={scanStyles.bottomRow}>
        <TouchableOpacity style={scanStyles.sideBtn}><Text style={scanStyles.sideBtnIcon}>🖼</Text></TouchableOpacity>
        <TouchableOpacity style={scanStyles.shutter} onPress={() => navigate('Loading')}>
          <View style={scanStyles.shutterInner} />
        </TouchableOpacity>
        <TouchableOpacity style={scanStyles.sideBtn}><Text style={scanStyles.sideBtnIcon}>🕐</Text></TouchableOpacity>
      </View>
    </View>
  );
}

// ─────────────────────────────────────
// 로딩 화면
// ─────────────────────────────────────
const STEPS = [
  { pct: 35, main: '가격 데이터 수집 중', sub: '35개 사이트 검색 중...' },
  { pct: 68, main: '배송비 계산 중', sub: '국가별 배송비 적용 중...' },
  { pct: 89, main: '관세 적용 중', sub: '한국 관세율 계산 중...' },
  { pct: 97, main: '최저가 발견!', sub: '결과를 정리하고 있어요...' },
];
const COUNTRIES = ['🇺🇸 USA', '🇯🇵 Japan', '🇬🇧 UK', '🇩🇪 Germany', '🇰🇷 Korea', '🇫🇷 France', '🇮🇹 Italy'];

function LoadingScreen({ navigate }) {
  const progressAnim = useRef(new Animated.Value(0)).current;
  const ring1Anim = useRef(new Animated.Value(0)).current;
  const ring2Anim = useRef(new Animated.Value(0)).current;
  const ring3Anim = useRef(new Animated.Value(0)).current;
  const iconPulse = useRef(new Animated.Value(1)).current;
  const scrollAnim = useRef(new Animated.Value(0)).current;
  const [stepIndex, setStepIndex] = useState(0);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    Animated.timing(progressAnim, { toValue: 1, duration: 3000, useNativeDriver: false }).start();
    STEPS.forEach((step, i) => setTimeout(() => { setStepIndex(i); setPct(step.pct); }, (i + 1) * 750));
    setTimeout(() => navigate('Result'), 3200);

    const startRing = (anim, delay) => setTimeout(() => {
      Animated.loop(Animated.sequence([
        Animated.timing(anim, { toValue: 1, duration: 2400, useNativeDriver: true }),
        Animated.timing(anim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])).start();
    }, delay);

    startRing(ring1Anim, 0);
    startRing(ring2Anim, 600);
    startRing(ring3Anim, 1200);

    Animated.loop(Animated.sequence([
      Animated.timing(iconPulse, { toValue: 1.08, duration: 1000, useNativeDriver: true }),
      Animated.timing(iconPulse, { toValue: 1, duration: 1000, useNativeDriver: true }),
    ])).start();

    Animated.loop(Animated.timing(scrollAnim, { toValue: 1, duration: 5000, useNativeDriver: true })).start();
  }, []);

  const ringStyle = (anim, size) => ({
    position: 'absolute', width: size, height: size, borderRadius: size / 2,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    opacity: anim.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0.5, 0.3, 0] }),
    transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.75, 1.1] }) }],
  });

  const progressWidth = progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '97%'] });
  const scrollX = scrollAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -300] });

  return (
    <View style={loadStyles.container}>
      <Text style={loadStyles.appName}>TAG CAP</Text>
      <View style={loadStyles.iconZone}>
        <Animated.View style={ringStyle(ring1Anim, 110)} />
        <Animated.View style={ringStyle(ring2Anim, 150)} />
        <Animated.View style={ringStyle(ring3Anim, 190)} />
        <Animated.View style={[loadStyles.iconWrap, { transform: [{ scale: iconPulse }] }]}>
          <View style={{ alignItems: 'center', gap: 5 }}>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <View style={loadStyles.qrBlock}><View style={loadStyles.qrInner} /></View>
              <View style={{ width: 10 }} />
              <View style={loadStyles.qrBlock}><View style={loadStyles.qrInner} /></View>
            </View>
            <View style={{ height: 6 }} />
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <View style={loadStyles.qrBlock}><View style={loadStyles.qrInner} /></View>
            </View>
          </View>
        </Animated.View>
      </View>
      <View style={{ alignItems: 'center', gap: 6 }}>
        <Text style={loadStyles.statusMain}>{STEPS[stepIndex].main}</Text>
        <Text style={loadStyles.statusSub}>{STEPS[stepIndex].sub}</Text>
      </View>
      <View style={{ overflow: 'hidden', width: '100%' }}>
        <Animated.View style={{ flexDirection: 'row', gap: 8, transform: [{ translateX: scrollX }] }}>
          {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
            <View key={i} style={{ backgroundColor: i % 3 === 0 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: i % 3 === 0 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 }}>
              <Text style={{ fontSize: 11, fontWeight: '500', color: i % 3 === 0 ? '#e2e2e2' : 'rgba(255,255,255,0.28)' }}>{c}</Text>
            </View>
          ))}
        </Animated.View>
      </View>
      <View style={{ width: '100%', gap: 8 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>검색 중...</Text>
          <Text style={{ fontSize: 11, fontWeight: '500', color: 'rgba(255,255,255,0.55)' }}>{pct}%</Text>
        </View>
        <View style={loadStyles.progressTrack}>
          <Animated.View style={[loadStyles.progressBar, { width: progressWidth }]} />
        </View>
      </View>
    </View>
  );
}

// ─────────────────────────────────────
// 결과 화면
// ─────────────────────────────────────
function ResultScreen({ navigate }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 500, useNativeDriver: true }),
    ]).start();
  }, []);

  const shops = [
    { rank: 1, name: 'Naver 해외직구', meta: '배송 5일 · 관세 없음', price: '₩116,000', best: true },
    { rank: 2, name: 'Tommy 공식몰 (US)', meta: '배송 7일 · 관세 ₩8,000', price: '₩134,000', best: false },
    { rank: 3, name: 'Farfetch', meta: '배송 10일 · 관세 ₩12,000', price: '₩151,000', best: false },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#111114' }} contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
      <View style={resultStyles.header}>
        <TouchableOpacity onPress={() => navigate('Main')}>
          <Text style={resultStyles.backBtn}>← 스캔 결과</Text>
        </TouchableOpacity>
        <Text style={resultStyles.brand}>TOMMY HILFIGER</Text>
        <Text style={resultStyles.product}>Yacht Club{'\n'}Bomber Jacket</Text>
      </View>
      <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
        <View style={resultStyles.body}>
          <View style={resultStyles.saveCard}>
            <View>
              <Text style={resultStyles.saveEyebrow}>절약 가능 금액</Text>
              <Text style={resultStyles.saveNumber}>₩62,000</Text>
              <Text style={resultStyles.saveSub}>배송비 · 관세 모두 포함</Text>
            </View>
            <View style={resultStyles.savePill}>
              <Text style={resultStyles.savePillNum}>46%</Text>
              <Text style={resultStyles.savePillLabel}>cheaper</Text>
            </View>
          </View>
          <View style={resultStyles.compareCard}>
            <View>
              <Text style={resultStyles.compareEyebrow}>현재 매장</Text>
              <Text style={[resultStyles.comparePrice, { color: '#ef4444', textDecorationLine: 'line-through', fontSize: 16 }]}>¥20,000</Text>
              <Text style={resultStyles.compareSub}>≈ ₩178,000</Text>
            </View>
            <View style={resultStyles.arrowCircle}>
              <Text style={{ color: '#e2e2e2', fontSize: 14 }}>→</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={resultStyles.compareEyebrow}>글로벌 최저가</Text>
              <Text style={resultStyles.comparePrice}>₩116,000</Text>
              <Text style={resultStyles.compareSub}>모든 비용 포함</Text>
            </View>
          </View>
          <View style={resultStyles.listCard}>
            <Text style={resultStyles.listHeader}>가격 비교</Text>
            {shops.map((shop) => (
              <View key={shop.rank} style={resultStyles.shopRow}>
                <View style={resultStyles.shopLeft}>
                  <View style={[resultStyles.rankDot, shop.rank === 1 ? resultStyles.rankDot1 : shop.rank === 2 ? resultStyles.rankDot2 : resultStyles.rankDot3]}>
                    <Text style={resultStyles.rankText}>{shop.rank}</Text>
                  </View>
                  <View>
                    <Text style={resultStyles.shopName}>{shop.name}</Text>
                    <Text style={resultStyles.shopMeta}>{shop.meta}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end', gap: 5 }}>
                  <Text style={[resultStyles.shopPrice, shop.best && { color: '#fff' }]}>{shop.price}</Text>
                  <TouchableOpacity style={[resultStyles.buyBtn, shop.best ? resultStyles.buyBtnFilled : resultStyles.buyBtnGhost]}>
                    <Text style={[resultStyles.buyBtnText, !shop.best && { color: 'rgba(255,255,255,0.3)' }]}>바로 구매</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <View style={resultStyles.shareRow}>
            <TouchableOpacity style={resultStyles.shareBtn}>
              <Text style={resultStyles.shareBtnText}>공유하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={resultStyles.rescanBtn} onPress={() => navigate('Main')}>
              <Text style={resultStyles.rescanBtnText}>다시 스캔</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

// ─────────────────────────────────────
// 스타일
// ─────────────────────────────────────
const mainStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'space-between', paddingTop: 80, paddingBottom: 60, paddingHorizontal: 24 },
  topSection: { alignItems: 'center', gap: 4 },
  appName: { fontSize: 11, fontWeight: '500', color: 'rgba(255,255,255,0.22)', letterSpacing: 3 },
  tagline: { fontSize: 32, fontWeight: '500', color: '#fff', letterSpacing: -0.5, marginTop: 4 },
  taglineGray: { color: '#d4d4d4' },
  subText: { fontSize: 12, color: 'rgba(255,255,255,0.2)', marginTop: 4, letterSpacing: 0.3 },
  coinArea: { width: 160, height: 40, position: 'relative' },
  coin: { position: 'absolute', fontSize: 14, fontWeight: '500', color: '#e5e5e5', top: 10 },
  middleSection: { alignItems: 'center' },
  scanButton: { width: 160, height: 160, borderRadius: 80, backgroundColor: '#1e1e1e', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.14)', alignItems: 'center', justifyContent: 'center', gap: 10 },
  qrContainer: { alignItems: 'center' },
  qrRow: { flexDirection: 'row', alignItems: 'center' },
  qrBlock: { width: 22, height: 22, borderRadius: 4, borderWidth: 2, borderColor: 'rgba(226,226,226,0.7)', backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  qrInner: { width: 10, height: 10, borderRadius: 2, backgroundColor: '#e2e2e2' },
  qrDataBlock: { width: 22, height: 22, justifyContent: 'center', paddingHorizontal: 2 },
  qrDataLine: { width: 18, height: 2.5, borderRadius: 1, backgroundColor: 'rgba(226,226,226,0.45)' },
  scanLabel: { fontSize: 11, fontWeight: '500', color: '#ccc', letterSpacing: 2 },
  badgeRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  badge: { backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.09)', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  badgeText: { fontSize: 10, fontWeight: '500', color: '#777' },
});

const scanStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505', alignItems: 'center', justifyContent: 'space-between', paddingTop: 60, paddingBottom: 60 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingHorizontal: 24 },
  iconBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.07)', alignItems: 'center', justifyContent: 'center' },
  iconBtnText: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  title: { fontSize: 14, fontWeight: '500', color: 'rgba(255,255,255,0.8)', letterSpacing: 0.3 },
  scanArea: { width: 220, height: 220, alignItems: 'center', justifyContent: 'center' },
  scanFrame: { width: 190, height: 190, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  corner: { position: 'absolute', width: 20, height: 20 },
  cornerTL: { top: 0, left: 0, borderTopWidth: 2.5, borderLeftWidth: 2.5, borderColor: '#e2e2e2', borderTopLeftRadius: 3 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 2.5, borderRightWidth: 2.5, borderColor: '#e2e2e2', borderTopRightRadius: 3 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 2.5, borderLeftWidth: 2.5, borderColor: '#e2e2e2', borderBottomLeftRadius: 3 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 2.5, borderRightWidth: 2.5, borderColor: '#e2e2e2', borderBottomRightRadius: 3 },
  scanLine: { position: 'absolute', top: 8, left: 8, right: 8, height: 1.5, backgroundColor: 'rgba(226,226,226,0.8)' },
  hintArea: { alignItems: 'center' },
  hintText: { fontSize: 13, color: 'rgba(255,255,255,0.3)', textAlign: 'center', lineHeight: 20 },
  hintHighlight: { color: '#e2e2e2', fontWeight: '500' },
  bottomRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 32 },
  sideBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.06)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center' },
  sideBtnIcon: { fontSize: 18 },
  shutter: { width: 68, height: 68, borderRadius: 34, backgroundColor: '#2a2a2a', borderWidth: 2.5, borderColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
  shutterInner: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#e2e2e2', opacity: 0.85 },
});

const loadStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d0d', alignItems: 'center', justifyContent: 'space-between', paddingTop: 80, paddingBottom: 60, paddingHorizontal: 28 },
  appName: { fontSize: 10, fontWeight: '500', color: 'rgba(255,255,255,0.22)', letterSpacing: 3 },
  iconZone: { width: 200, height: 200, alignItems: 'center', justifyContent: 'center' },
  iconWrap: { width: 72, height: 72, borderRadius: 36, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  qrBlock: { width: 16, height: 16, borderRadius: 3, borderWidth: 1.5, borderColor: 'rgba(226,226,226,0.7)', backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  qrInner: { width: 7, height: 7, borderRadius: 1.5, backgroundColor: '#e2e2e2' },
  statusMain: { fontSize: 16, fontWeight: '500', color: '#fff', letterSpacing: -0.2, textAlign: 'center' },
  statusSub: { fontSize: 12, color: 'rgba(255,255,255,0.28)', textAlign: 'center' },
  progressTrack: { width: '100%', height: 3, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: 10, overflow: 'hidden' },
  progressBar: { height: '100%', backgroundColor: '#e2e2e2', borderRadius: 10 },
});

const resultStyles = StyleSheet.create({
  header: { backgroundColor: '#0d0d0d', padding: 24, paddingTop: 60, paddingBottom: 24 },
  backBtn: { fontSize: 12, color: 'rgba(255,255,255,0.28)', marginBottom: 12 },
  brand: { fontSize: 10, fontWeight: '500', color: 'rgba(255,255,255,0.3)', letterSpacing: 2, marginBottom: 4 },
  product: { fontSize: 22, fontWeight: '500', color: '#fff', letterSpacing: -0.5, lineHeight: 28 },
  body: { padding: 16, gap: 10 },
  saveCard: { backgroundColor: '#1c1c1f', borderRadius: 20, padding: 18, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 },
  saveEyebrow: { fontSize: 9, fontWeight: '500', color: 'rgba(255,255,255,0.35)', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 2 },
  saveNumber: { fontSize: 34, fontWeight: '500', color: '#fff', letterSpacing: -1.5, lineHeight: 38 },
  saveSub: { fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 2 },
  savePill: { backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', borderRadius: 24, paddingHorizontal: 12, paddingVertical: 8, alignItems: 'center' },
  savePillNum: { fontSize: 18, fontWeight: '500', color: '#e2e2e2', letterSpacing: -0.5 },
  savePillLabel: { fontSize: 9, color: 'rgba(255,255,255,0.3)' },
  compareCard: { backgroundColor: '#1c1c1f', borderRadius: 20, padding: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },
  compareEyebrow: { fontSize: 10, color: 'rgba(255,255,255,0.28)' },
  comparePrice: { fontSize: 18, fontWeight: '500', color: '#fff', letterSpacing: -0.5 },
  compareSub: { fontSize: 10, color: 'rgba(255,255,255,0.28)' },
  arrowCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  listCard: { backgroundColor: '#1c1c1f', borderRadius: 20, overflow: 'hidden', marginBottom: 10 },
  listHeader: { padding: 14, paddingBottom: 8, fontSize: 9, fontWeight: '500', color: 'rgba(255,255,255,0.25)', letterSpacing: 1.8, textTransform: 'uppercase' },
  shopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 12, paddingHorizontal: 14, borderTopWidth: 0.5, borderTopColor: 'rgba(255,255,255,0.05)' },
  shopLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rankDot: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  rankDot1: { backgroundColor: 'rgba(255,255,255,0.14)' },
  rankDot2: { backgroundColor: 'rgba(255,255,255,0.07)' },
  rankDot3: { backgroundColor: 'rgba(255,255,255,0.04)' },
  rankText: { fontSize: 9, fontWeight: '500', color: '#fff' },
  shopName: { fontSize: 13, fontWeight: '500', color: '#e2e2e2' },
  shopMeta: { fontSize: 10, color: 'rgba(255,255,255,0.25)' },
  shopPrice: { fontSize: 13, fontWeight: '500', color: 'rgba(255,255,255,0.4)' },
  buyBtn: { borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 },
  buyBtnFilled: { backgroundColor: '#e2e2e2' },
  buyBtnGhost: { borderWidth: 1, borderColor: 'rgba(255,255,255,0.12)' },
  buyBtnText: { fontSize: 10, fontWeight: '500', color: '#111' },
  shareRow: { flexDirection: 'row', gap: 8 },
  shareBtn: { flex: 1, backgroundColor: '#1c1c1f', borderRadius: 14, padding: 13, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  shareBtnText: { fontSize: 13, fontWeight: '500', color: 'rgba(255,255,255,0.35)' },
  rescanBtn: { flex: 1, backgroundColor: '#e2e2e2', borderRadius: 14, padding: 13, alignItems: 'center' },
  rescanBtnText: { fontSize: 13, fontWeight: '500', color: '#111' },
});
